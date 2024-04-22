import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
interface DecodedUser extends JwtPayload {
  user: {
    id: string;
  };
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("authorization");
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedUser;
    req.body.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default authMiddleware;
