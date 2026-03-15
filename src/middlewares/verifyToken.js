import jwt from 'jsonwebtoken'

export default function verifyToken(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];

  if(!token) {
    res.status(401).json({"INVALID_CREDENTIALS": "No token provided"});
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({"INVALID_CREDENTIALS": "Invalid token"});
  }
} 