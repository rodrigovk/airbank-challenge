import "reflect-metadata";
import { Resolver, Query, Mutation, Arg, Ctx, } from "type-graphql";
import { SortOrder, CategoryOrderByInput, CategoryCreateInput, Category } from "@entities";
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

  @Mutation(() => Category)
  async createCategory(
    @Ctx() ctx: Context,
    @Arg("data") data: CategoryCreateInput,
  ) {
    return ctx.prisma.category.create({
      data,
    });
  }
}