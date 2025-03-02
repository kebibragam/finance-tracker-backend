import Transaction, { ITransaction } from "../models/Transaction";

const getTotalSpentByCategory = async (userId: string): Promise<any> => {
  return await Transaction.aggregate([
    { $match: { userId, type: "expense" } },
    { $group: { _id: "$category", totalSpent: { $sum: "$amount" } } },
  ]);
};

const getMonthlyExpenseSummary = async (
  userId: string,
  month: number,
  year: number
): Promise<any> => {
  return await Transaction.aggregate([
    {
      $match: {
        userId,
        type: "expense",
        date: {
          $gte: new Date(year, month - 1, 1),
          $lt: new Date(year, month, 1),
        },
      },
    },
    { $group: { _id: null, totalSpent: { $sum: "$amount" } } },
  ]);
};

export default { getTotalSpentByCategory, getMonthlyExpenseSummary };
