import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { parseJWT } from "../helper/jwtTool";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token =
      req.headers["x-auth-token"] ||
      req.body.token ||
      req.headers["authorization"];
    if (!token) return res.status(400).json({ message: "No token provided" });
    const parsedToken = parseJWT(token);
    req.username = (parsedToken as JwtPayload).username;
    next();
  } catch (e) {
    res.status(401).json({ message: "Invalid token" });
  }
};
