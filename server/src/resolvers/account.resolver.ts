import "reflect-metadata";
import { Resolver, Query, Arg, Ctx, } from "type-graphql";
import { ResolveTree } from "graphql-parse-resolve-info";
import { SortOrder, AccountOrderByInput, Account, AccountFieldOrderBy } from "@entities";
import { Context } from "@frameworks/apollo-server/context";
import { Fields } from "@frameworks/graphql";

@Resolver(Account)
export class AccountResolver {
  @Query(() => [Account])
  async accounts(
    @Ctx() ctx: Context,
    @Fields() fields: ResolveTree,
    @Arg("orderBy", { nullable: true }) orderBy: AccountOrderByInput,
  ) {
    let _orderBy = undefined;
    if (orderBy && orderBy.field === AccountFieldOrderBy.bank) _orderBy = { bank: { name: orderBy.sortOrder } };
    else
      _orderBy = { name: orderBy ? orderBy.sortOrder : SortOrder.asc };

    return ctx.prisma.account.findMany({
      include: {
        bank: fields.fieldsByTypeName.Account["bank"] ? {
          select: {
            id: true,
            name: true,
          }
        } : false,
      },
      orderBy: _orderBy,
    });
  }
}