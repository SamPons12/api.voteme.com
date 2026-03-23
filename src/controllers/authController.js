import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import { logger } from '../utils/logger.js';

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
      const user = await User.create(email, hashPassword)
      if (user) {
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
  }
}