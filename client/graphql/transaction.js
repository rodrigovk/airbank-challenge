import { gql } from 'graphql-tag'

export const QUERY_TRANSACTIONS = gql`query Transactions($orderBy: TransactionOrderByInput) {
  transactions(orderBy: $orderBy) {
    id
    accountId
    categoryId
    reference
    amount
    currency
    date
    category {
      name
      color
    }
  }
}`
