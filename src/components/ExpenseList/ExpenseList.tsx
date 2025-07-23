import { useMutation, type Reference, type StoreObject } from '@apollo/client';
import type { Expense } from '../../models/expense';
import ExpenseItem from '../ExpenseItem/ExpenseItem';
import './ExpenseList.scss';
import { DELETE_EXPENSE } from '../../graphql/mutations';
import { GET_EXPENSES } from '../../graphql/queries';

type Props = {
  expenses: Expense[]
}

export default function ExpenseList({ expenses }: Props) {
    const [deleteExpense] = useMutation(DELETE_EXPENSE, {
        update(cache, { data }) {
        cache.modify({
            fields: {
                gastos(existingRefs = [], { readField }) {
                    return existingRefs.filter(
                        (ref: Reference | StoreObject | undefined) => readField('id', ref) !== data.delete_gastos_by_pk.id
                    )
                }
            }
        })
        },
        refetchQueries: [{ query: GET_EXPENSES }]
    })

    if (expenses.length === 0) {
        return <p className="not-available">Not available expenses</p>
    }

    const handleDeleteItem = (itemId: string) => {
        deleteExpense({
            variables: { id: itemId },
            optimisticResponse: {
                delete_gastos_by_pk: { id: itemId, __typename: 'gastos' }
            }
        })
    }

    return (
        <div className="expense-list">
            <h3 className='expense-list__title'>Expenses</h3>
            {expenses.map((expense) => (
                <ExpenseItem key={expense.id} expense={expense} onDelete={handleDeleteItem} />
            ))}
        </div>
    )
}