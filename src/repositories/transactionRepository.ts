import Transaction, { ITransaction } from "../models/Transaction";

const createTransaction = async (
  transactionData: Partial<ITransaction>
): Promise<ITransaction> => {
  return await Transaction.create(transactionData);
};

const findUserTransactions = async (
  userId: string
): Promise<ITransaction[]> => {
  return await Transaction.find({ userId }).sort({ date: -1 });
};

export default { createTransaction, findUserTransactions };
