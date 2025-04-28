import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
function authenticate(req, res, next) {
  const token = req.cookies?.Authtoken;

  if (!token) return res.status(404).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.Secretkey);
    req.userType = decoded.userType;
    next();
  } catch {
    res.status(404).json({ error: "Invalid token" });
  }
}

module.exports = authenticate;
