import {
  Prisma, PrismaClient,
  Account, Bank, Category, Transaction,
} from "@prisma/client";

const prismaClient = new PrismaClient({
  log: ["error", "info", "query", "warn"], //?
});

export {
  Prisma, prismaClient, PrismaClient,
  Account, Bank, Category, Transaction,
};