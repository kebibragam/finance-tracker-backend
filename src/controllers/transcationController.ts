import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import transactionService from "../services/transactionService";

export const createTransaction = async (req: AuthRequest, res: Response) => {
  try {
    const transaction = await transactionService.createTransaction(
      req.user!.userId,
      req.body
    );
    res.status(201).json(transaction);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ error: err.message });
  }
};

export const getUserTransactions = async (req: AuthRequest, res: Response) => {
  try {
    const transactions = await transactionService.getUserTransactions(
      req.user!.userId
    );
    res.json(transactions);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
};
