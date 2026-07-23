import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { EXPENSE_CATEGORIES, type Person } from '../../models/expense';
import { ADD_EXPENSE } from '../../graphql/mutations';

import './ExpenseForm.scss';
import { useCreateForm } from '../../contexts/useCreateForm';

type Props = {
  onExpenseSaved: () => void
}

export default function ExpenseForm({ onExpenseSaved }: Props) {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [person, setPerson] = useState<Person>('Jair');
    const [month, setMonth] = useState(() => {
        const now = new Date()
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
    });
    const [category, setCategory] = useState('');

    const [addExpense, { loading }] = useMutation(ADD_EXPENSE);

    const { isCreateModalOpen, closeCreateModal } = useCreateForm();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!name || !amount || !person || !month) return

        try {
            await addExpense({
                variables: {
                    name,
                    amount: parseFloat(amount.replace(/\./g, '').replace(',', '.')),
                    person,
                    month,
                    category: category ? category : null
                }
            })

            // reset form
            setName('');
            setAmount('');
            setMonth(getCurrentMonth());
            setPerson('Jair');
            setCategory('');

            onExpenseSaved();
            closeCreateModal();
        } catch (err) {
            console.error('Error saving expense:', err)
        }
    }

    const formatCurrency = (value: string) => {
        const digits = value.replace(/\D/g, '')
        return digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }

    function getCurrentMonth(): string {
        return `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`
    }

    if (!isCreateModalOpen) return null;
    return (
        <form onSubmit={handleSubmit} className="create-expense">

        {/* 1. Amount */}
        <div className="create-expense__field">
            <label className="create-expense__label">
                <span className="label-text">Amount (COP)</span>
            </label>
            <input
                type="text"
                className="create-expense__input"
                placeholder="E.g. 52.000"
                value={amount}
                onChange={(e) => setAmount(formatCurrency(e.target.value))}
                required
            />
        </div>

        {/* 2. Expense name */}
        <div className="create-expense__field">
            <label className="create-expense__label">
                <span className="label-text">Expense name</span>
            </label>
            <input
                type="text"
                className="create-expense__input"
                placeholder="E.g. Fruits and vegetables"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
        </div>

        {/* 3. Person */}
        <div className="create-expense__field">
            <label className="create-expense__label">
                <span className="label-text">Person</span>
            </label>
            <select
                className="create-expense__input"
                value={person}
                onChange={(e) => setPerson(e.target.value as Person)}
            >
                <option value="Anyelly">Anyelly</option>
                <option value="Jair">Jair</option>
            </select>
        </div>

        {/* 4. Month */}
        <div className="create-expense__field">
            <label className="create-expense__label">
                <span className="label-text">Month</span>
            </label>
            <input
                type="month"
                className="create-expense__input"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
            />
        </div>

        {/* 5. Category (optional) */}
        <div className="create-expense__field">
            <label className="create-expense__label">
                <span className="label-text">Category <span className="label-optional">(optional)</span></span>
            </label>
            <select
                className="create-expense__input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="">Select a category…</option>
                {EXPENSE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>
        </div>

        <button type="submit" className="create-expense__submit" disabled={loading}>
            {loading ? 'Saving...' : 'Add Expense'}
        </button>
        </form>
    )
}