import "reflect-metadata";
import { Resolver, Query, Arg, Ctx, } from "type-graphql";
import { SortOrder, AccountOrderByInput, Account, AccountFieldOrderBy } from "@entities";
import { Context } from "@frameworks/apollo-server/context";

@Resolver(Account)
export class AccountResolver {
  @Query(() => [Account])
  async accounts(
    @Arg("orderBy", { nullable: true }) orderBy: AccountOrderByInput,
    @Ctx() ctx: Context,
  ) {
    let _orderBy = undefined;
    if (orderBy && orderBy.field === AccountFieldOrderBy.name) _orderBy = { name: orderBy.sortOrder };
    else
      if (orderBy && orderBy.field === AccountFieldOrderBy.bank) _orderBy = { bank: orderBy.sortOrder };
      else
        _orderBy = { id: orderBy ? orderBy.sortOrder : SortOrder.asc };

    return ctx.prisma.account.findMany({
      orderBy: _orderBy,
    });
  }
}