import { gql } from 'graphql-tag'

export const QUERY_CATEGORIES = gql`query Banks {
  categories {
    id
    name
    color
  }
}`
