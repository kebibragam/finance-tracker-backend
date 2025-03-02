import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import logger from "../utils/logger";

export interface AuthRequest extends Request {
  user?: { userId: string };
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    logger.warn("Unauthorized access attempt");
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    logger.warn("Invalid token used in request");
    res.status(400).json({ error: "Invalid token" });
    return;
  }

  req.user = decoded;
  next();
};

export default authMiddleware;
