import type { Expense } from "../../models/expense"
import './ExpenseItem.scss' 
import { formatCOP, formatMonthYear } from '../../utils/format';
import { useLongPress } from "../../contexts/useLongPress";
import { useState } from "react";
import ConfirmModal from "../Modals/ConfirmModal/ConfirmModal";

type Props = {
  expense: Expense;
  onDelete: (id:string) => void;
}

export default function ExpenseItem({ expense, onDelete }: Props) {
    const [deleting, setDeleting] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const longPress = useLongPress(() => {
        handleDeleting();
    }, 1000);

    const handleDeleting = () => {
        setDeleting(true);
        setShowConfirmModal(true);
    }

    const handleCancel = () => {
        setDeleting(false);
        setShowConfirmModal(false);
    }

    const handleConfirm = () => {
        onDelete(expense.id);
        setTimeout(() => {
            setShowConfirmModal(false);
        }, 1200);
    }
    
    return (
        <div className={`expense-item ${deleting ? 'delete-item' : ''}`} {...longPress} onDoubleClick={handleDeleting}>
            <div className="expense-item__container1">
                <span className="expense-item__month">{ formatMonthYear(expense.month) }</span>
                <span className="expense-item__name">{expense.name}</span>
            </div>
            <div className="expense-item__container2">
                <span className="expense-item__person">{expense.person}</span>
                <span className="expense-item__amount">{ formatCOP(expense.amount) }</span>
            </div>
            {showConfirmModal && (
                <ConfirmModal 
                    message={`Delete "${expense.name}"?`} 
                    onCancel={handleCancel} 
                    onConfirm={handleConfirm}>
                </ConfirmModal>
            )}
            
        </div>
    )
}