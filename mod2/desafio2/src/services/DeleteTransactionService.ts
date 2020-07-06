import { getCustomRepository } from "typeorm";
import AppError from "../errors/AppError";
import TransactionsRepository from "../repositories/TransactionsRepository";

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionsReposotory = getCustomRepository(TransactionsRepository);

    const transaction = await transactionsReposotory.findOne(id);

    if (!transaction) {
      throw new AppError("Transaction does not exist");
    }

    await transactionsReposotory.remove(transaction);
  }
}

export default DeleteTransactionService;
