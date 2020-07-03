// import AppError from '../errors/AppError';
import { getCustomRepository, getRepository } from "typeorm";

import TransactionRepository from "../repositories/TransactionsRepository";
import Transaction from "../models/Transaction";
import Category from "../models/Category";
import transactionsRouter from "../routes/transactions.routes";
import TransactionsRepository from "../repositories/TransactionsRepository";

interface Request {
  title: string;
  value: number;
  type: "income" | "outcome";
  category: string;
}
class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const transactionRepository = getCustomRepository(TransactionRepository);
    const categoryRepository = getRepository(Category);

    let transactionCategory = await categoryRepository.findOne({
      where: {
        title: category,
      },
    });

    if (!transactionCategory) {
      transactionCategory = categoryRepository.create({
        title: category,
      });

      await categoryRepository.save(transactionCategory);
    }

    const transactions = transactionRepository.create({
      title,
      value,
      type,
      category: transactionCategory,
    });

    await transactionRepository.save(transactions);

    return transactions;
  }
}

export default CreateTransactionService;
