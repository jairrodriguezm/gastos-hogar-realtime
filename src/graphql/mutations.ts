import { gql } from '@apollo/client'

export const ADD_EXPENSE = gql`
  mutation AddExpense($name: String!, $amount: numeric!, $person: String!, $month: String!) {
    insert_gastos(objects: { name: $name, amount: $amount, person: $person, month: $month }) {
      returning {
        id
        name
        amount
        person
        month
      }
    }
  }
`