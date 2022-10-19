import { gql } from 'graphql-tag'

export const QUERY_BANKS = gql`query Banks {
  banks {
    id
    name
  }
}`
