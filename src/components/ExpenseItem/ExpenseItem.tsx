import type { Expense } from "../../models/expense"
import './ExpenseItem.scss' 

type Props = {
  expense: Expense
}

export default function ExpenseItem({ expense }: Props) {
    
    return (
        <div className="expense-item">
            <span>{expense.name}</span>
            <span>{expense.amount}</span>
            <span>{expense.person}</span>
            <span>{expense.month}</span>
        </div>
    )
}