import './ExpenseFilter.scss';
import type { Expense } from '../../models/expense';
import { formatCOP, formatMonthYear } from '../../utils/format';

type Props = {
    filterMonth: string;
    setFilterMonth: (month: string) => void;
    person: string;
    setPerson: (person: string) => void;
    expenses: Expense[];
}

export default function ExpenseFilter ({ filterMonth, setFilterMonth, person, setPerson, expenses }: Props) {
    const jairTotal = expenses
        .filter((e) => e.month === filterMonth && e.person === 'Jair')
        .reduce((sum, e) => sum + Number(e.amount), 0);

    const anyellyTotal = expenses
        .filter((e) => e.month === filterMonth && e.person === 'Anyelly')
        .reduce((sum, e) => sum + Number(e.amount), 0);

    const monthTotal = expenses
        .filter((e) => e.month === filterMonth)
        .reduce((sum, e) => sum + Number(e.amount), 0);

    return (
        <div className='expense-filter'>
            <div className="expense-filter__field">
                <label className="expense-filter__label">
                    <span className="label-text">Month</span>
                </label>
                <input
                type="month"
                className="expense-filter__input"
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
                required
                />
            </div>
            <div className="expense-filter__field">
                <label className="expense-filter__label">
                    <span className="label-text">Person</span>
                </label>
                <select
                className="expense-filter__input"
                value={person}
                onChange={(e) => setPerson(e.target.value)}
                >
                    <option value="All">All</option>
                    <option value="Anyelly">Anyelly</option>
                    <option value="Jair">Jair</option>
                </select>
            </div>
            {filterMonth && (
                <div className="expense-filter__summary">
                    <div className="expense-filter__summary-header">
                        Summary for {formatMonthYear(filterMonth)}
                    </div>
                    <div className="expense-filter__summary-grid">
                        <div className="expense-filter__summary-card">
                            <span className="member-name">Jair</span>
                            <span className="member-amount">{formatCOP(jairTotal)}</span>
                        </div>
                        <div className="expense-filter__summary-card">
                            <span className="member-name">Anyelly</span>
                            <span className="member-amount">{formatCOP(anyellyTotal)}</span>
                        </div>
                        <div className="expense-filter__summary-card expense-filter__summary-card--total">
                            <span className="member-name">Total Month</span>
                            <span className="member-amount">{formatCOP(monthTotal)}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

