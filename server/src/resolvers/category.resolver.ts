import "reflect-metadata";
import { Resolver, Query, Arg, Ctx, } from "type-graphql";
import { SortOrder, CategoryOrderByInput, Category, CategoryFieldOrderBy } from "@entities";
import { Context } from "@frameworks/apollo-server/context";

@Resolver(Category)
export class CategoryResolver {
  @Query(() => [Category])
  async categories(
    @Arg("orderBy", { nullable: true }) orderBy: CategoryOrderByInput,
    @Ctx() ctx: Context,
  ) {
    let _orderBy = undefined;
    if (orderBy && orderBy.field === CategoryFieldOrderBy.name) _orderBy = { name: orderBy.sortOrder };
    else
      if (orderBy && orderBy.field === CategoryFieldOrderBy.color) _orderBy = { color: orderBy.sortOrder };
      else
        _orderBy = { id: orderBy ? orderBy.sortOrder : SortOrder.asc };

    return ctx.prisma.category.findMany({
      orderBy: _orderBy,
    });
  }
}