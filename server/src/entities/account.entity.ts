import "reflect-metadata";
import { ObjectType, InputType, Field, ID } from "type-graphql";
import { Bank, SortOrder } from "@entities";

export enum AccountFieldOrderBy {
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

  @Field()
  name: string;

  @Field(() => Bank)
  bank?: Bank;
}