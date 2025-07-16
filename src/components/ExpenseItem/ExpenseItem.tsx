import type { Expense } from "../../models/expense"
import './ExpenseItem.scss' 
import { formatCOP, formatMonthYear } from '../../utils/format';
import { useLongPress } from "../../contexts/useLongPress";

type Props = {
  expense: Expense;
  onDelete: (id:string) => void;
}

export default function ExpenseItem({ expense, onDelete }: Props) {

    const longPress = useLongPress(() => {
        if (confirm(`Eliminar "${expense.name}"?`)) {
            onDelete(expense.id);
        }
    }, 1000);
    
    return (
        <div className="expense-item" {...longPress}>
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