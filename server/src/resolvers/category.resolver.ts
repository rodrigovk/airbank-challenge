import "reflect-metadata";
import { Resolver, Query, Arg, Ctx, } from "type-graphql";
import { SortOrder, CategoryOrderByInput, Category } from "@entities";
import { Context } from "@frameworks/apollo-server/context";

@Resolver(Category)
export class CategoryResolver {
  @Query(() => [Category])
  async categories(
    @Arg("orderBy", { nullable: true }) orderBy: CategoryOrderByInput,
    @Ctx() ctx: Context,
  ) {
    return ctx.prisma.category.findMany({
      orderBy: {
        name: orderBy ? orderBy.sortOrder : SortOrder.asc,
      },
    });
  }
}