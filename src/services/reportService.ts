import reportRepository from "../repositories/reportRepository";

const getSpendingInsights = async (userId: string) => {
  return await reportRepository.getTotalSpentByCategory(userId);
};

const getMonthlySummary = async (
  userId: string,
  month: number,
  year: number
) => {
  return await reportRepository.getMonthlyExpenseSummary(userId, month, year);
};

export default { getSpendingInsights, getMonthlySummary };
