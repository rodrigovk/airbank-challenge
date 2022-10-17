import csv from "csv-parser";
import fs from "fs";
import { PrismaClient, Account, Category, Transaction } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
  await prisma.transaction.deleteMany({});
  await prisma.account.deleteMany({});
  await prisma.category.deleteMany({});

  const accounts: Account[] = [];
  fs.createReadStream("data/accounts.csv")
    .pipe(csv({
      headers: ["id", "name", "bank"],
      skipLines: 1,
    }))
    .on("data", (account: Account) => {
      accounts.push(account);
    })
    .on("end", async () => {
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