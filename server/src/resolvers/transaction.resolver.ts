import "reflect-metadata";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  ID,
} from "type-graphql";
import { ResolveTree } from "graphql-parse-resolve-info";
import { SortOrder, TransactionOrderByInput, TransactionsFilter, TransactionsInput, Transaction, TransactionFieldOrderBy, PaginationInput } from "@entities";
import { Context } from "@frameworks/apollo-server/context";
import { Fields } from "@frameworks/graphql";

const MIN_TRANSACTIONS_TAKE = 1;
const MAX_TRANSACTIONS_TAKE = 50;

@Resolver(Transaction)
export class TransactionResolver {
  // for performance reasons, feeding the Account and Category Field inside the queries
  // @FieldResolver()
  // async account(@Root() transaction: Transaction, @Ctx() ctx: Context): Promise<Account> {
  //   return ctx.prisma.account.findUniqueOrThrow({
  //     where: {
  //       id: transaction.accountId,
  //     },
  //   });
  // }
  // 
  // @FieldResolver()
  // async category(@Root() transaction: Transaction, @Ctx() ctx: Context): Promise<Category | null> {
  //   return ctx.prisma.category.findUnique({
  //     where: {
  //       id: transaction.categoryId,
  //     },
  //   });
  // }

  @Query(() => Transaction, { nullable: true })
  async transaction(@Arg("id") id: string, @Ctx() ctx: Context) {
    return ctx.prisma.transaction.findUnique({
      include: {
        account: true,
        category: true,
      },
      where: { id },
    });
  }

  @Query(() => [Transaction])
  async transactions(
    @Ctx() ctx: Context,
    @Fields() fields: ResolveTree,
    @Arg("filter", { nullable: true }) filter: TransactionsFilter,
    @Arg("orderBy", { nullable: true }) orderBy: TransactionOrderByInput,
    @Arg("pagination", { nullable: true }) pagination?: PaginationInput,
  ) {
    const take = Math.min(Math.max(pagination?.take ?? 0, MIN_TRANSACTIONS_TAKE), MAX_TRANSACTIONS_TAKE);
    const cursor = pagination?.cursor ?? null;
    const sortField = orderBy?.field ?? "date";
    const sortOrder = orderBy?.sortOrder ?? "desc";

    function checkOrderBy(field: string): SortOrder | undefined {
      return sortField === field ? sortOrder : undefined;
    }

    const _orderBy = {
      account: checkOrderBy(TransactionFieldOrderBy.accountName) ? 
        { 
          name: sortOrder,
        } : undefined,
      category: checkOrderBy(TransactionFieldOrderBy.categoryName) ? 
        {
          name: sortOrder,
        } : undefined,
      reference: checkOrderBy(TransactionFieldOrderBy.reference),
      amount: checkOrderBy(TransactionFieldOrderBy.amount),
      currency: checkOrderBy(TransactionFieldOrderBy.currency),
      date: checkOrderBy(TransactionFieldOrderBy.date),
    };

    return ctx.prisma.transaction.findMany({
      include: {
        account: fields.fieldsByTypeName.Transaction["account"] ? {
          select: {
            id: true,
            name: true,
            bank: true,
          }
        } : false,
        category: fields.fieldsByTypeName.Transaction["category"] ? {
          select: {
            id: true,
            name: true,
            color: true,
          }
        } : false,
      },
      skip: cursor ? 1 : 0,
      take: take,
      cursor: cursor ? { id: cursor } : undefined,
      where: {
        AND: [
          {
            account: filter?.bankId ? { bank: { id: filter.bankId } } : undefined,
            accountId: filter?.accountId ? filter.accountId : undefined,
            date: {
              gte: filter?.startingDate ? filter.startingDate : undefined,
              lte: filter?.endingDate ? filter.endingDate : undefined
            },
          },
          {
            OR: filter?.textSearch ? [
              { reference: filter?.textSearch ? { contains: filter.textSearch, mode: "insensitive" } : undefined },
              { account: filter?.textSearch ? { name: { contains: filter.textSearch, mode: "insensitive" } } : undefined },
              { account: filter?.textSearch ? { bank: { name: { contains: filter.textSearch, mode: "insensitive" } } } : undefined },
              { category: filter?.textSearch ? { name: { contains: filter.textSearch, mode: "insensitive" } } : undefined },
              //? DATE
              //? AMOUNT
              { currency: filter?.textSearch && filter?.textSearch.length === 3 ? { equals: filter.textSearch, mode: "insensitive" } : undefined },
            ] : undefined,
          }
        ]
      },
      orderBy: [
        _orderBy,
        {
          id: SortOrder.asc,
        }
      ]
    });
  }

  @Mutation(() => Transaction)
  async createTransaction(
    @Arg("data") data: TransactionsInput,
    @Ctx() ctx: Context,
  ) {
    return ctx.prisma.transaction.create({
      data,
    });
  }

  @Mutation(() => Transaction, { nullable: true })
  async changeTransaction(
    @Arg("id", () => ID) id: string,
    @Arg("data") data: TransactionsInput,
    @Ctx() ctx: Context,
  ) {
    return ctx.prisma.transaction.update({
      data,
      where: {
        id,
      }
    });
  }

  @Mutation(() => Transaction, { nullable: true })
  async deleteTransaction(
    @Arg("id", () => ID) id: string,
    @Ctx() ctx: Context,
  ) {
    return ctx.prisma.transaction.delete({
      where: {
        id,
      },
    });
  }
}