
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const auth = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      const SECRET_KEY = process.env.SECRET_KEY;
      const user = jwt.verify(token, SECRET_KEY);
      req.userId = user.id;
    } else {
      return res.status(401).json({ success: false, message: "Unauthorized User" });
    }
    next();
  } catch (error) {
    console.log("Token verification error:", error);
    res.status(401).json({ success: false, message: "Unauthorized User" });
  }
};

export default auth;