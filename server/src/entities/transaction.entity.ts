import "reflect-metadata";
import { ObjectType, InputType, Field, ID } from "type-graphql";
import { SortOrder, Account, Category } from "@entities";

export enum TransactionFieldOrderBy {
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
  @Field({ nullable: true })
  textSearch: string;

  @Field(() => ID, { nullable: true })
  bankId: string;

  @Field(() => ID, { nullable: true })
  accountId: string;

  @Field({ nullable: true })
  startingDate: Date;

  @Field({ nullable: true })
  endingDate: Date;
}

@InputType()
export class TransactionUpdateInput {
  @Field(() => ID, { nullable: true })
  accountId?: string;

  @Field(() => ID, { nullable: true })
  categoryId?: string;

  @Field({ nullable: true })
  reference?: string;

  @Field({ nullable: true })
  amount?: number;

  @Field({ nullable: true })
  currency?: string;

  @Field({ nullable: true })
  date?: Date;
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