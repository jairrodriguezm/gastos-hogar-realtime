import type { Expense } from '../../models/expense';
import ExpenseItem from '../ExpenseItem/ExpenseItem';
import './ExpenseList.scss';

type Props = {
  expenses: Expense[]
}

export default function ExpenseList({ expenses }: Props) {
    if (expenses.length === 0) {
        return <p className="text-center text-gray-500">Not available expenses</p>
    }

    const handleDeleteItem = (itemId: string) => {
        console.log("========> ",itemId);
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