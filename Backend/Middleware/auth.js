import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function authenticate(req, res, next) {
  const token = req.cookies?.Authtoken;

  if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.Secretkey);
    req.userType = decoded.userType;   
    req.userId = decoded.userId;      
    next();
  } catch {
    res.status(403).json({ error: "Invalid token" });
  }
}

export { authenticate };
