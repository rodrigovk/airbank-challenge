import "reflect-metadata";
import * as tq from "type-graphql";
import { ApolloServer } from "apollo-server";
import { GraphQLScalarType } from "graphql";
import { DateTimeResolver } from "graphql-scalars";
import { context } from "@frameworks/apollo-server/context";
import { SortOrder, AccountFieldOrderBy, BankFieldOrderBy, CategoryFieldOrderBy, TransactionFieldOrderBy } from "@entities";
import { AccountResolver, BankResolver, CategoryResolver, TransactionResolver } from "@resolvers";

const app = async () => {
  tq.registerEnumType(SortOrder, {
    name: "SortOrder",
  });
  tq.registerEnumType(AccountFieldOrderBy, {
    name: "AccountFieldOrderBy",
  });
  tq.registerEnumType(BankFieldOrderBy, {
    name: "BankFieldOrderBy",
  });
  tq.registerEnumType(CategoryFieldOrderBy, {
    name: "CategoryFieldOrderBy",
  });
  tq.registerEnumType(TransactionFieldOrderBy, {
    name: "TransactionFieldOrderBy",
  });

  const schema = await tq.buildSchema({
    resolvers: [AccountResolver, BankResolver, CategoryResolver, TransactionResolver],
    scalarsMap: [{ type: GraphQLScalarType, scalar: DateTimeResolver }],
  });

  new ApolloServer({ schema, context: context }).listen({ port: 4000 }, () =>
    console.log("Server ready at: http://localhost:4000"),
  );
};

app();