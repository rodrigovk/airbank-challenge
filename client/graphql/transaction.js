import { gql } from 'graphql-tag'

export const QUERY_TRANSACTIONS = gql`query Transactions($orderBy: TransactionOrderByInput, $pagination: PaginationInput, $filter: TransactionsFilter) {
  transactions(orderBy: $orderBy, pagination: $pagination, filter: $filter) {
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

export const QUERY_TRANSACTIONS_WITH_FILTERS = gql`query TransactionsWithFilters($orderBy: TransactionOrderByInput, $pagination: PaginationInput, $filter: TransactionsFilter) {
  accounts {
    id
    name
  }
  banks {
    id
    name
  }
  transactions(orderBy: $orderBy, pagination: $pagination, filter: $filter) {
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

export const QUERY_TRANSACTION = gql`query Accounts($transactionId: String!) {
  transaction(id: $transactionId) {
    id
    accountId
    categoryId
    reference
    amount
    currency
    date
  }
}`

export const QUERY_TRANSACTION_WITH_LOOKUPS = gql`query Accounts($transactionId: String!) {
  accounts {
    id
    name
  }
  categories {
    id
    name
    color
  }
  transaction(id: $transactionId) {
    id
    accountId
    categoryId
    reference
    amount
    currency
    date
  }
}`

export const MUTATION_TRANSACTION_UPDATE = gql`mutation UpdateTransaction($data: TransactionUpdateInput!, $transactionId: ID!) {
  updateTransaction(data: $data, id: $transactionId) {
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
