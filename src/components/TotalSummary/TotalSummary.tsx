import "./TotalSummary.scss";
import { formatCOP, formatMonthYear } from '../../utils/format';
import type { Expense } from "../../models/expense";
import { useCallback, useMemo } from "react";

type Props = {
    expenses: Expense[];
}

export default function TotalSummary({ expenses}: Props) {

    const currentMonth = useMemo(() => {
        const now = new Date()
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
    }, [])

    const currentMonthTotal = useMemo(() => {
        return expenses
            .filter((e) => e.month === currentMonth)
            .reduce((sum, e) => sum + Number(e.amount), 0)
    }, [expenses, currentMonth])

    const getCurrentMonthTotalUser = useCallback((user:string) => {
        return expenses
            .filter((e) => e.month === currentMonth && e.person === user)
            .reduce((sum, e) => sum + Number(e.amount), 0)
    }, [expenses, currentMonth])

    const totalAmountValue = useMemo(() => {
        return expenses
            .reduce((sum, e) => sum + Number(e.amount), 0)
    }, [expenses])

    const getCurrentYearTotalUser = useCallback((user:string) => {
        return expenses
            .filter((e) => e.person === user)
            .reduce((sum, e) => sum + Number(e.amount), 0)
    }, [expenses])
    
    return (
        <div className="total-summary">
            <div className="total-summary__container">
                <span className="total-summary__month">Total {formatMonthYear(currentMonth)}</span>
                <span className="total-summary__amount-month">{ formatCOP(currentMonthTotal) }</span>
            </div>
            <div className="total-summary__container">
                <span className="total-summary__month">Total All Expenses</span>
                <span className="total-summary__amount-month">{ formatCOP(totalAmountValue) }</span>
            </div>
            <div className="total-summary__container">
                <span className="total-summary__month">{formatMonthYear(currentMonth)} - Jair</span>
                <span className="total-summary__amount-month">{ formatCOP(getCurrentMonthTotalUser('Jair')) }</span>
                <span className="total-summary__year">Total Year</span>
                <span className="total-summary__amount-year">{ formatCOP(getCurrentYearTotalUser('Jair')) }</span>
            </div>
            <div className="total-summary__container">
                <span className="total-summary__month">{formatMonthYear(currentMonth)} - Anyelly</span>
                <span className="total-summary__amount-month">{ formatCOP(getCurrentMonthTotalUser('Anyelly')) }</span>
                <span className="total-summary__year">Total Year</span>
                <span className="total-summary__amount-year">{ formatCOP(getCurrentYearTotalUser('Anyelly')) }</span>
            </div>
        </div>
    )
}