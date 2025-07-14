import type { Expense } from "../../models/expense"
import './ExpenseItem.scss' 
import { formatCOP, formatMonthYear } from '../../utils/format';

type Props = {
  expense: Expense
}

export default function ExpenseItem({ expense }: Props) {
    
    return (
        <div className="expense-item">
            <div className="expense-item__container1">
                <span className="expense-item__month">{ formatMonthYear(expense.month) }</span>
                <span className="expense-item__name">{expense.name}</span>
            </div>
            <div className="expense-item__container2">
                <span className="expense-item__person">{expense.person}</span>
                <span className="expense-item__amount">{ formatCOP(expense.amount) }</span>
            </div>
        </div>
    )
}