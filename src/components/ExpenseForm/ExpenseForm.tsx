import { useState } from 'react';
import { useMutation } from '@apollo/client';
import type { Person} from '../../models/expense';
import { ADD_EXPENSE } from '../../graphql/mutations'

import './ExpenseForm.scss';

type Props = {
  onExpenseSaved : () => void
}

export default function ExpenseForm({ onExpenseSaved }: Props) {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [person, setPerson] = useState<Person>('Jair');
    const [month, setMonth] = useState(() => {
        const now = new Date()
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
    })

    const [addExpense, { loading }] = useMutation(ADD_EXPENSE)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!name || !amount || !person || !month) return

        try {
            await addExpense({
                variables: {
                name,
                amount: parseFloat(amount.replace(/\./g, '').replace(',', '.')),
                person,
                month
                }
            })

            // reset form
            setName('')
            setAmount('')
            setMonth(getCurrentMonth())
            setPerson('Jair')

            onExpenseSaved()
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

    return (
        <form onSubmit={handleSubmit} className="create-expense">
        <div className="create-expense__field">
            <label className="create-expense__label">
                <span className="label-text">Factura</span>
            </label>
            <input
            type="text"
            className="create-expense__input"
            placeholder="Ej. Verduras"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            />
        </div>

        <div className="create-expense__field">
            <label className="create-expense__label">
                <span className="label-text">Monto (COP)</span>
            </label>
            <input
            type="text"
            className="create-expense__input"
            placeholder="Ej. 52.000"
            value={amount}
            onChange={(e) => setAmount(formatCurrency(e.target.value))}
            required
            />
        </div>

        <div className="create-expense__field">
            <label className="create-expense__label">
                <span className="label-text">Persona</span>
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

        <div className="create-expense__field">
            <label className="create-expense__label">
                <span className="label-text">Mes</span>
            </label>
            <input
            type="month"
            className="create-expense__input"
            placeholder="Ej. Julio 2025"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            />
        </div>

        <button type="submit" className="create-expense__submit" disabled={loading}>
            {loading ? 'Saving...' : 'Add Expense'}
        </button>
        </form>
    )
}