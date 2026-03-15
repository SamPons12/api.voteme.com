import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

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
        return res.status(201).json({
          ok: true
        })
      }

    } catch (error) {
      console.log(error)
    }
  },

  login: async (req, res, next) => {
    try {
      const {email, password} = req.body

      const user = await User.findOne(email);
      if (!user) {return res.status(409).json({error: "INVALID_CREDENTIALS", message: "Email o contraseña incorrecto"})}
      
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {return res.status(409).json({error: "INVALID_CREDENTIALS", message: "Email o contraseña incorrecto "})}
      
      const token = jwt.sign({
        userId: user.user_id,
        email: user.email,
        role: user.role
      }, process.env.JWT_SECRET, {expiresIn: 86400});
      return res.status(200).json({token});
    } catch (error) {
    
    }
  }
}