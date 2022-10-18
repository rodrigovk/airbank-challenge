import "reflect-metadata";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  // Info,
  // FieldResolver,
  // Root,
  ID,
  // Int,
  // InputType,
  // Field,
} from "type-graphql";
//import { parseResolveInfo, ResolveTree, simplifyParsedResolveInfoFragmentWithType } from "graphql-parse-resolve-info";
import { SortOrder, TransactionOrderByInput, TransactionsFilter, TransactionsInput, Transaction, TransactionFieldOrderBy, PaginationInput } from "@entities";
import { Context } from "@frameworks/apollo-server/context";
import { Fields } from "@frameworks/graphql";
import { ResolveTree } from "graphql-parse-resolve-info";
//import { GraphQLResolveInfo } from "graphql";

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
    // @Arg("take") take: number,
    // @Arg("cursor", { nullable: true }) cursor?: string,
    //@Info() info: GraphQLResolveInfo,
  ) {
    const take = Math.min(Math.max(pagination?.take ?? 0, MIN_TRANSACTIONS_TAKE), MAX_TRANSACTIONS_TAKE);
    const cursor = pagination?.cursor ?? null;

    function checkOrderBy(field: string): SortOrder | undefined { //? put in other file and use on other resolvers
      return orderBy && orderBy.field === field ? orderBy.sortOrder : undefined;
    }

    const _orderBy = { //? require the input of the orderBy data?
      // account: { //? can't have account {} and category {} at the same orderBy
      //   name: checkOrderBy(TransactionFieldOrderBy.accountName),
      // },
      // category: {
      //   name: checkOrderBy(TransactionFieldOrderBy.categoryName),
      // },
      reference: checkOrderBy(TransactionFieldOrderBy.reference),
      amount: checkOrderBy(TransactionFieldOrderBy.amount),
      currency: checkOrderBy(TransactionFieldOrderBy.currency),
      date: checkOrderBy(TransactionFieldOrderBy.date),
    };

    // console.log(fields.fieldsByTypeName?.[Object.keys(fields.fieldsByTypeName)[0]]);

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
            //? BANK
            accountId: filter?.accountId ? filter.accountId : undefined,
            date: {
              gte: filter?.startingDate ? filter.startingDate : undefined,
              lte: filter?.startingDate ? filter.startingDate : undefined
            },
          },
          {
            OR: filter?.textSearch ? [ //? testar
              { reference: filter?.textSearch ? { contains: filter.textSearch } : undefined },
              { account: filter?.textSearch ? { name: { contains: filter.textSearch } } : undefined },
              { account: filter?.textSearch ? { bank: { contains: filter.textSearch } } : undefined },
              { category: filter?.textSearch ? { name: { contains: filter.textSearch } } : undefined },
              //? DATE
              //? AMOUNT
              //? CURRENCY
            ] : undefined,
          }
        ]
      },
      orderBy: [
        _orderBy,
        {
          id: SortOrder.asc, //?
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