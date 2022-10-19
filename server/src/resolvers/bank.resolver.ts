import "reflect-metadata";
import { Resolver, Query, Arg, Ctx, } from "type-graphql";
import { SortOrder, BankOrderByInput, Bank } from "@entities";
import { Context } from "@frameworks/apollo-server/context";

@Resolver(Bank)
export class BankResolver {
  @Query(() => [Bank])
  async banks(
    @Ctx() ctx: Context,
    @Arg("orderBy", { nullable: true }) orderBy: BankOrderByInput,
  ) {
    return ctx.prisma.bank.findMany({
      orderBy: { name: orderBy ? orderBy.sortOrder : SortOrder.asc },
    });
  }
}