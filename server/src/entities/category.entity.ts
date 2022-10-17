import "reflect-metadata";
import { ObjectType, InputType, Field, ID } from "type-graphql";
import { SortOrder } from "@entities";

export enum CategoryFieldOrderBy { //? nome?
  id = "id",
  name = "name",
  color = "color",
}

@InputType()
export class CategoryOrderByInput {
  @Field(() => CategoryFieldOrderBy)
  field: CategoryFieldOrderBy;
  @Field(() => SortOrder)
  sortOrder: SortOrder;
}

@ObjectType()
export class Category {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  color: string | null;

  // @Field((type) => [Post], { nullable: true })
  // posts?: [Post] | null
}