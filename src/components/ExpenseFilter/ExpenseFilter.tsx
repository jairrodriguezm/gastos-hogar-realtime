import './ExpenseFilter.scss';

type Props = {
    filterMonth: string;
    setFilterMonth: (month: string) => void;
    person: string;
    setPerson: (person: string) => void;
}

export default function ExpenseFilter ({ filterMonth, setFilterMonth, person, setPerson }: Props) {
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
