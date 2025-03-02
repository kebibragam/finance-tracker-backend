import express from "express";
import {
  createTransaction,
  getUserTransactions,
} from "../controllers/transcationController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, createTransaction);
router.get("/", authMiddleware, getUserTransactions);

export default router;
