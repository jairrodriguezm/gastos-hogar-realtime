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

export const DELETE_EXPENSE = gql`
  mutation DeleteExpense($id: uuid!) {
    delete_gastos_by_pk(id: $id) {
      id
    }  
  }
`