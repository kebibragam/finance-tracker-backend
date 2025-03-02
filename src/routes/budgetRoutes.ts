import express from "express";
import Budget, { IBudget } from "../models/Budget";
import authMiddleware, { AuthRequest } from "../middleware/authMiddleware";

const router = express.Router();

/**
 * @route   POST /api/budget
 * @desc    Create or update a budget
 * @access  Private
 */
router.post(
  "/",
  authMiddleware,
  async (req: AuthRequest, res: express.Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const { category, limit, startDate, endDate } = req.body;

      let budget = await Budget.findOne({ userId: req.user.userId, category });

      if (budget) {
        budget.limit = limit;
        budget.startDate = startDate;
        budget.endDate = endDate;
        await budget.save();
      } else {
        budget = new Budget({
          userId: req.user.userId,
          category,
          limit,
          startDate,
          endDate,
        });
        await budget.save();
      }

      res.status(201).json(budget);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

/**
 * @route   GET /api/budget
 * @desc    Get all budgets for the logged-in user
 * @access  Private
 */
router.get(
  "/",
  authMiddleware,
  async (req: AuthRequest, res: express.Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const budgets = await Budget.find({ userId: req.user.userId });
      res.json(budgets);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

/**
 * @route   PUT /api/budget/:id
 * @desc    Update a budget
 * @access  Private
 */
router.put(
  "/:id",
  authMiddleware,
  async (req: AuthRequest, res: express.Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const { limit, startDate, endDate } = req.body;
      const budget = await Budget.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.userId },
        { limit, startDate, endDate },
        { new: true }
      );

      if (!budget) {
        res.status(404).json({ error: "Budget not found" });
        return;
      }

      res.json(budget);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

/**
 * @route   DELETE /api/budget/:id
 * @desc    Delete a budget
 * @access  Private
 */
router.delete(
  "/:id",
  authMiddleware,
  async (req: AuthRequest, res: express.Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const budget = await Budget.findOneAndDelete({
        _id: req.params.id,
        userId: req.user.userId,
      });

      if (!budget) {
        res.status(404).json({ error: "Budget not found" });
        return;
      }

      res.json({ message: "Budget deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

export default router;
