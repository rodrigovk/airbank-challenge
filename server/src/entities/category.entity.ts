import "reflect-metadata";
import { ObjectType, InputType, Field, ID } from "type-graphql";
import { SortOrder } from "@entities";

export enum CategoryFieldOrderBy {
  name = "name",
}

@InputType()
export class CategoryOrderByInput {
  @Field(() => CategoryFieldOrderBy)
  field: CategoryFieldOrderBy;
  @Field(() => SortOrder)
  sortOrder: SortOrder;
}

@InputType()
export class CategoryCreateInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  color?: string;
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