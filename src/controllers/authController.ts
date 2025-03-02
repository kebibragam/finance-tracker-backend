import { Request, Response } from "express";
import authService from "../services/authService";
import logger from "../utils/logger";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await authService.register(req.body);
    logger.info(`New user registered: ${user.email}`);
    res.status(201).json(user);
  } catch (error) {
    logger.error(`Registration failed: ${(error as Error).message}`);
    res.status(400).json({ error: (error as Error).message });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = await authService.login(req.body);
    logger.info(`User logged in: ${req.body.email}`);
    res.json({ token });
  } catch (error) {
    logger.error(
      `Login failed for ${req.body.email}: ${(error as Error).message}`
    );
    res.status(401).json({ error: (error as Error).message });
  }
};
