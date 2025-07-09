import { gql } from '@apollo/client'

export const GET_EXPENSES = gql`
  query GetExpenses {
    gastos(order_by: { created_at: desc }) {
      id
      name
      amount
      person
      month
      created_at
    }
  }
`