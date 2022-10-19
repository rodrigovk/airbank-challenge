import csv from "csv-parser";
import fs from "fs";
import { PrismaClient, Account, Category, Transaction } from "@prisma/client";

type BankCreate = {
  name: string,
}

type RawAccount = {
  id: string,
  name: string,
  bank: string,
}

const prisma = new PrismaClient();
async function main() {
  await prisma.transaction.deleteMany({});
  await prisma.account.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.bank.deleteMany({});

  const banks: BankCreate[] = [];
  // const accounts: Account[] = [];
  const rawAccounts: RawAccount[] = [];
  fs.createReadStream("data/accounts.csv")
    .pipe(csv({
      headers: ["id", "name", "bank"],
      skipLines: 1,
    }))
    .on("data", (rawAccount: RawAccount) => {
      rawAccounts.push(rawAccount);

      const index = banks.findIndex(b => b.name === rawAccount.bank);
      if (index < 0) banks.push({ name: rawAccount.bank });
    })
    .on("end", async () => {
      await prisma.bank.createMany({
        data: banks,
      });
      console.log(`${banks.length} Banks imported successfully`);

      const createdBanks = await prisma.bank.findMany();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const accounts: Account[] = rawAccounts.map(raw => ({ id: raw.id, name: raw.name, bankId: createdBanks.find(b => b.name === raw.bank)!.id }));

      await prisma.account.createMany({
        data: accounts,
      });
      console.log(`${accounts.length} Accounts imported successfully`);
    });

  const categories: Category[] = [];
  fs.createReadStream("data/categories.csv")
    .pipe(csv({
      headers: ["id", "name", "color"],
      skipLines: 1,
    }))
    .on("data", (category: Category) => {
      categories.push(category);
    })
    .on("end", async () => {
      await prisma.category.createMany({
        data: categories,
      });
      console.log(`${categories.length} Categories imported successfully`);
    });

  const transactions: Transaction[] = [];
  fs.createReadStream("data/transactions.csv")
    .pipe(csv({
      headers: ["id", "accountId", "categoryId", "reference", "amount", "currency", "dateAsString"],
      skipLines: 1,
    }))
    .on("data", ({ categoryId, dateAsString, ...remainder }) => {
      const transaction: Transaction = { categoryId: categoryId !== "" ? categoryId : null, date: new Date(dateAsString + "+0000"), ...remainder };
      transactions.push(transaction);
    })
    .on("end", async () => {
      await prisma.transaction.createMany({
        data: transactions,
      });
      console.log(`${transactions.length} Transactions imported successfully`);
    });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });