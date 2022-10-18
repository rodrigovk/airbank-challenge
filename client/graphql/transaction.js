import { gql } from 'graphql-tag'

export const QUERY_TRANSACTIONS = gql`query Transactions($orderBy: TransactionOrderByInput, $pagination: PaginationInput) {
  transactions(orderBy: $orderBy, pagination: $pagination) {
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
