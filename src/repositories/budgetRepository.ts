import Budget, { IBudget } from "../models/Budget";

const createBudget = async (budgetData: Partial<IBudget>): Promise<IBudget> => {
  return await Budget.create(budgetData);
};

const findUserBudgets = async (userId: string): Promise<IBudget[]> => {
  return await Budget.find({ userId });
};

const updateBudget = async (
  budgetId: string,
  budgetData: Partial<IBudget>
): Promise<IBudget | null> => {
  return await Budget.findByIdAndUpdate(budgetId, budgetData, { new: true });
};

const deleteBudget = async (budgetId: string): Promise<IBudget | null> => {
  return await Budget.findByIdAndDelete(budgetId);
};

export default { createBudget, findUserBudgets, updateBudget, deleteBudget };
