import { gql } from 'graphql-tag'

export const QUERY_ACCOUNTS = gql`query Banks {
  accounts {
    id
    name
  }
}`

export const QUERY_ACCOUNTS_WITH_BANK = gql`query Banks {
  accounts {
    id
    name
    bank {
      id
      name
    }
  }
}`
