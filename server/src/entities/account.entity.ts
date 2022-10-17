import "reflect-metadata";
import { ObjectType, InputType, Field, ID } from "type-graphql";
import { SortOrder } from "@entities";

export enum AccountFieldOrderBy { //? nome?
  id = "id",
  name = "name",
  bank = "bank",
}

@InputType()
export class AccountOrderByInput {
  @Field(() => AccountFieldOrderBy)
  field: AccountFieldOrderBy;
  @Field(() => SortOrder)
  sortOrder: SortOrder;
}

@ObjectType()
export class Account {
  @Field(() => ID)
  id: string;

  @Field() //?
  name: string;

  @Field(() => String) //?
  bank: string;

  // @Field((type) => [Post], { nullable: true })
  // posts?: [Post] | null
}