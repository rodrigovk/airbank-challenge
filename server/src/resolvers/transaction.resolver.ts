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
import { SortOrder, TransactionOrderByInput, TransactionsFilter, TransactionsInput, Transaction, TransactionFieldOrderBy } from "@entities";
import { Context } from "@frameworks/apollo-server/context";
import { Fields } from "@frameworks/graphql";
import { ResolveTree } from "graphql-parse-resolve-info";
//import { GraphQLResolveInfo } from "graphql";

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
    @Arg("orderBy", { nullable: true }) orderBy: TransactionOrderByInput,
    @Arg("filter", { nullable: true }) filter: TransactionsFilter,
    @Ctx() ctx: Context,
    @Fields() fields: ResolveTree,
    //@Info() info: GraphQLResolveInfo,
  ) {
    function checkOrderBy(field: string): SortOrder | undefined { //? put in other file and use on other resolvers
      return orderBy && orderBy.field === field ? orderBy.sortOrder : undefined;
    }

    const _orderBy = {
      id: checkOrderBy(TransactionFieldOrderBy.id),
      accountId: checkOrderBy(TransactionFieldOrderBy.accountId),
      categoryId: checkOrderBy(TransactionFieldOrderBy.categoryId),
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
      orderBy: _orderBy,
      skip: 0, //?
      take: 5, //?
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