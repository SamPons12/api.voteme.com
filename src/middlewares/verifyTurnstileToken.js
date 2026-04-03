import { logger } from "../utils/logger.js";

export default async function verifyTurnstileToken(req, res, next) {
  const token = req.body.token;
  const ip = req.ip;
  if (!token) {
    logger.error('Turnstile token not provided', req.body);
    return res.status(401).json({"TURNSTILE_ERROR": "Token not provided"})
  }

  try {
    const response = await fetch(process.env.CLOUDFLARE_SITEVERIFY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token,
        remoteip: ip,
      }),
    })

    const result = await response.json();

    if (!result.success) {
      logger.error('Error while verifying token', result['error-codes'])
      return res.status(400).json({ok: false, message: "Error verifying turnstile token"})
    }

    next();
  } catch (err) {
    logger.error('Error while verifying token', err.message)
    res.status(400).json({ok: false, message: "Error verifying turnstile token"})
  }
}
