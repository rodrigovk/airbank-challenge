import "reflect-metadata";
import { ObjectType, InputType, Field, ID } from "type-graphql";
import { SortOrder, Account, Category } from "@entities";

export enum TransactionFieldOrderBy { //? nome?
  accountName = "accountName",
  categoryName = "categoryName",
  reference = "reference",
  amount = "amount",
  currency = "currency",
  date = "date",
}

@InputType()
export class TransactionOrderByInput {
  @Field(() => TransactionFieldOrderBy)
  field: TransactionFieldOrderBy;
  @Field(() => SortOrder)
  sortOrder: SortOrder;
}

@InputType()
export class TransactionsFilter {
  @Field()
  textSearch: string;

  //? @Field(() => ID)
  //? bankId: string; create separate table for banks? or just filter over the name?

  @Field()
  accountId: string;

  @Field()
  startingDate: Date;

  @Field()
  endingDate: Date;
}

@InputType()
export class TransactionsInput {
  @Field()
  accountId: string;

  @Field({ nullable: true })
  categoryId: string;

  @Field({ nullable: true })
  reference: string;

  @Field()
  amount: number;

  @Field()
  currency: string;

  @Field()
  date: Date;
}

@ObjectType()
export class Transaction {
  @Field(() => ID)
  id: string;

  @Field()
  accountId: string;

  @Field({ nullable: true })
  categoryId: string;

  @Field({ nullable: true })
  reference: string;

  @Field()
  amount: number;

  @Field()
  currency: string;

  @Field()
  date: Date;

  @Field(() => Account)
  account: Account;

  @Field(() => Category, { nullable: true })
  category?: Category;
}