import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import { logger } from '../utils/logger.js';
import { mailController } from "./mailController.js";

export const authController = {
  register: async (req, res, next) => {
    try {
      const {email, password} = req.body

      const userExists = await User.findOne(email)
      if (userExists) {
        return res.status(409).json({
          error: "EMAIL_EXISTS",
          message: "El email ya esta registrado"
        })
      }

      const hashPassword = await bcrypt.hash(password, 10)
      const verificationToken = crypto.randomUUID().toString();
      const user = await User.create(email, hashPassword, verificationToken);
      if (user) {
        await mailController.sendVerificationEmail(email, verificationToken);

        logger.info(`Usuario registrado: ${email}`);
        return res.status(201).json({
          ok: true,
          message: "Usuario registrado correctamente"
        })
      }
      return res.status(400).json({ok: false, message: "Failed to create user"});
    } catch (error) {
      logger.error(`Register error: ${error.message}`);
      return res.status(500).json({ok: false, message: "Error al registrar usuario"});
    }
  },

  login: async (req, res, next) => {
    try {
      const {email, password} = req.body

      const user = await User.findOne(email);
      if (!user) {return res.status(401).json({error: "INVALID_CREDENTIALS", message: "Email o contraseña incorrecto"})}
      
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {return res.status(401).json({error: "INVALID_CREDENTIALS", message: "Email o contraseña incorrecto"})}
      
      const token = jwt.sign({
        userId: user.user_id,
        email: user.email,
        role: user.role
      }, process.env.JWT_SECRET, {expiresIn: 86400});
      
      logger.info(`Login exitoso: ${email}`);
      return res.status(200).json({ok: true, token});
    } catch (error) {
      logger.error(`Login error: ${error.message}`);
      return res.status(500).json({ok: false, message: "Error al iniciar sesión"});
    }
  },
  verifyEmail: async (req, res) => {
    try {
      const { token } = req.query;
      if (!token) {
        return res.status(400).json({ ok: false, message: "Token de verificación es requerido" });
      }

      const user = await User.findByVerificationToken(token);
      if (!user) {
        return res.status(400).json({ ok: false, message: "Token de verificación inválido" });
      }

      await User.verifyEmail(user.user_id);

      logger.info(`Email verificado: ${user.email}`);
      return res.status(200).json({ ok: true, message: "Email verificado correctamente" });
    } catch (error) {
      logger.error(`Email verification error: ${error.message}`);
      return res.status(500).json({ ok: false, message: "Error al verificar email" });
    }
  }
}