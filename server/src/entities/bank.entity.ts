import "reflect-metadata";
import { ObjectType, InputType, Field, ID } from "type-graphql";
import { SortOrder } from "@entities";

export enum BankFieldOrderBy {
  name = "name",
}

@InputType()
export class BankOrderByInput {
  @Field(() => BankFieldOrderBy)
  field: BankFieldOrderBy;
  @Field(() => SortOrder)
  sortOrder: SortOrder;
}

@ObjectType()
export class Bank {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;
}