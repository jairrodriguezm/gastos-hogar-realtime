import { useState } from 'react';
import './ExpenseFilter.scss';

export default function ExpenseFilter () {
    const [filterMonth,setFilterMonth] =  useState(() => {
        const now = new Date()
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
    });
    const [person, setPerson] = useState('All');

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
        </div>
    );
}