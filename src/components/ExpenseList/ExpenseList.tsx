import type { Expense } from '../../models/expense';
import ExpenseItem from '../ExpenseItem/ExpenseItem';
import './ExpenseList.scss';

type Props = {
  expenses: Expense[]
}

export default function ExpenseList({ expenses }: Props) {
    if (expenses.length === 0) {
        return <p className="text-center text-gray-500">No hay facturas disponibles</p>
    }

    return (
        <div className="expense-list">
        {expenses.map((expense) => (
            <ExpenseItem expense={expense} />
        ))}
        </div>
    )
}