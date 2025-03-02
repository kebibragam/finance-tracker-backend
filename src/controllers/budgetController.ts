import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import budgetService from "../services/budgetService";

export const createBudget = async (req: AuthRequest, res: Response) => {
  try {
    const budget = await budgetService.createBudget(req.user!.userId, req.body);
    res.status(201).json(budget);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ error: err.message });
  }
};

export const getUserBudgets = async (req: AuthRequest, res: Response) => {
  try {
    const budgets = await budgetService.getUserBudgets(req.user!.userId);
    res.json(budgets);
  } catch (error) {
    const err = error as Error;
    res.status(405).json({ error: err.message });
  }
};
