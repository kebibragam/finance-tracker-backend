import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import reportService from "../services/reportService";

export const getSpendingInsights = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const insights = await reportService.getSpendingInsights(req.user.userId);
    res.json(insights);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getMonthlySummary = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const { month, year } = req.query;
    if (!month || !year) {
      res.status(400).json({ error: "Month and Year are required" });
      return;
    }

    const summary = await reportService.getMonthlySummary(
      req.user.userId,
      parseInt(month as string),
      parseInt(year as string)
    );
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
