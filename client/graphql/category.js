import { gql } from 'graphql-tag'

export const QUERY_CATEGORIES = gql`query Banks {
  categories {
    id
    name
    color
  }
}`

export const MUTATION_CATEGORY_CREATE = gql`mutation CreateCategory($data: CategoryCreateInput!) {
  createCategory(data: $data) {
    id
    name
    color
  }
}`
