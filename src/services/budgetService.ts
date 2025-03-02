import budgetRepository from "../repositories/budgetRepository";

const createBudget = async (userId: string, budgetData: any) => {
  return await budgetRepository.createBudget({ ...budgetData, userId });
};

const getUserBudgets = async (userId: string) => {
  return await budgetRepository.findUserBudgets(userId);
};

const updateBudget = async (budgetId: string, budgetData: any) => {
  return await budgetRepository.updateBudget(budgetId, budgetData);
};

const deleteBudget = async (budgetId: string) => {
  return await budgetRepository.deleteBudget(budgetId);
};

export default { createBudget, getUserBudgets, updateBudget, deleteBudget };
