import { logger } from '../utils/logger.js';

export default function isAdmin(req, res, next) {
  const role = req.user.role;

  if (role !== 'admin') {
    logger.warn(`Unauthorized admin access attempt by user: ${req.user?.userId}`);
    res.status(403).json({'INVALID_CREDENTIALS': 'Insufficient privilige'});
  }

  next();
}