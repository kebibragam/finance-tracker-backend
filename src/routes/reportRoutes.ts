import express from "express";
import {
  getSpendingInsights,
  getMonthlySummary,
} from "../controllers/reportController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.get("/insights", authMiddleware, getSpendingInsights);
router.get("/monthly-summary", authMiddleware, getMonthlySummary);

export default router;
