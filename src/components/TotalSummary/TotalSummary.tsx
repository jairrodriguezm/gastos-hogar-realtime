import "./TotalSummary.scss";
import { formatCOP, formatMonthYear } from '../../utils/format';

type Props = {
    totalAmount: number;
    month: string;
    monthTotal: number;
}

export default function TotalSummary({ totalAmount, month, monthTotal}: Props) {
    
    return (
        <div className="total-summary">
            <div className="total-summary__container">
                <span className="total-summary__month">Total {formatMonthYear(month)}</span>
                <span className="total-summary__amount">{ formatCOP(monthTotal) }</span>
            </div>
            <div className="total-summary__container">
                <span className="total-summary__month">Total All Expenses</span>
                <span className="total-summary__amount">{ formatCOP(totalAmount) }</span>
            </div>
        </div>
    )
}