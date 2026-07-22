import { useMutation, type Reference, type StoreObject } from '@apollo/client';
import type { Expense } from '../../models/expense';
import ExpenseItem from '../ExpenseItem/ExpenseItem';
import './ExpenseList.scss';
import { DELETE_EXPENSE } from '../../graphql/mutations';
import { GET_EXPENSES } from '../../graphql/queries';
import { useState } from 'react';
import ExpenseFilter from '../ExpenseFilter/ExpenseFilter';

type Props = {
  expenses: Expense[]
}

export default function ExpenseList({ expenses }: Props) {
    const [showFilter, setShowFilter] =  useState(false);
    const [filterMonth, setFilterMonth] = useState(() => {
        const now = new Date()
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
    });
    const [person, setPerson] = useState('All');

    const [deleteExpense] = useMutation(DELETE_EXPENSE, {
        update(cache, { data }) {
        cache.modify({
            fields: {
                gastos(existingRefs = [], { readField }) {
                    return existingRefs.filter(
                        (ref: Reference | StoreObject | undefined) => readField('id', ref) !== data.delete_gastos_by_pk.id
                    )
                }
            }
        })
        },
        refetchQueries: [{ query: GET_EXPENSES }]
    })

    const filteredExpenses = expenses.filter((expense) => {
        const matchesMonth = filterMonth ? expense.month === filterMonth : true;
        const matchesPerson = person === 'All' ? true : expense.person === person;
        return matchesMonth && matchesPerson;
    });

    const handleDeleteItem = (itemId: string) => {
        deleteExpense({
            variables: { id: itemId },
            optimisticResponse: {
                delete_gastos_by_pk: { id: itemId, __typename: 'gastos' }
            }
        })
    }

    const handleFilterBtn = () => {
        setShowFilter(!showFilter);
    }

    return (
        <div className="expense-list">
            <div className='expense-list__header'>
                <h3 className='expense-list__title'>Expenses</h3>
                <span className='material-symbols-outlined expense-list__filter-btn' onClick={handleFilterBtn}>tune</span>
            </div>
            <div>
                {showFilter && (
                    <ExpenseFilter
                        filterMonth={filterMonth}
                        setFilterMonth={setFilterMonth}
                        person={person}
                        setPerson={setPerson}
                    />
                )}
            </div>
            {filteredExpenses.length === 0 ? (
                <p className="not-available">No expenses found</p>
            ) : (
                filteredExpenses.map((expense) => (
                    <ExpenseItem key={expense.id} expense={expense} onDelete={handleDeleteItem} />
                ))
            )}
        </div>
    )
}
