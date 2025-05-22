import jwt from 'jsonwebtoken'
import { config } from "dotenv";

config();

const checkAuthenticaion  = (req, res, next) => {
    const token = req.cookies.token;
  
    if (!token) {
      return res.status(401).json({ message: "Authentication token not provided" });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
      }
  
      req.user = decoded;
      next();
    });
  };


export {
    checkAuthenticaion
}