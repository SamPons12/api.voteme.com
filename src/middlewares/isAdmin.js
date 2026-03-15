export default function isAdmin(req, res, next) {
  const role = req.user.role;

  if (role !== 'admin') {
    res.status(403).json({'INVALID_CREDENTIALS': 'Insufficient privilige'});
  }

  next();
}