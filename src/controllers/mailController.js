import mg from "../config/mail.js";
import { logger } from "../utils/logger.js"

export const mailController = {
  sendVerificationEmail: async (email, token) => {
    try {
      const data = await mg.messages.create(process.env.MAILGUN_DOMAIN  , {
        from: process.env.MAILGUN_FROM,
        to: [email],
        subject: "Verificación email Vote4Me",
        text: `Por favor, verifica tu email haciendo clic en el siguiente enlace: ${process.env.CLIENT_APP_URL}/verificar-email?token=${token}`,
      });
      console.log(data)
    } catch (err) {
      logger.error(`Send verification email error: ${err.message}`);
      return res.status(500).json({ ok: false, message: "Error sending verification email" });
    }
  }
}