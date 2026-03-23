import jwt from 'jsonwebtoken'
import { logger } from '../utils/logger.js';

export default function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if(!token) {
    logger.warn('Token not provided');
    res.status(401).json({"INVALID_CREDENTIALS": "No token provided"});
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    logger.error(`Token verification failed: ${err.message}`);
    res.status(403).json({"INVALID_CREDENTIALS": "Invalid token"});
  }
} 