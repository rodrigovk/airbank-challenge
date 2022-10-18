import { InputType, Field, ID } from "type-graphql";

export enum SortOrder { //? remove the use on the selects, should convert to another enum, preferencially the SortOrder from Prisma
  asc = "asc",
  desc = "desc",
}

@InputType()
export class PaginationInput {
  @Field()
  take: number;
  @Field(() => ID, { nullable: true })
  cursor?: string;
}