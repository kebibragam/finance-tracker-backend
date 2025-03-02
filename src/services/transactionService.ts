import transactionRepository from "../repositories/transactionRepository";

const createTransaction = async (userId: string, transactionData: any) => {
  return await transactionRepository.createTransaction({
    ...transactionData,
    userId,
  });
};

const getUserTransactions = async (userId: string) => {
  return await transactionRepository.findUserTransactions(userId);
};

export default { createTransaction, getUserTransactions };
