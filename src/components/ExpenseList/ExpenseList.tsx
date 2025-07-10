import type { Expense } from '../../models/expense';

type Props = {
  expenses: Expense[]
}

export default function ExpenseList({ expenses }: Props) {
    if (expenses.length === 0) {
        return <p className="text-center text-gray-500">No hay facturas disponibles</p>
    }

    return (
        <div className="p-4 space-y-4">
        {expenses.map((expense) => (
            <div
            key={expense.id}
            className="border rounded-md p-4 shadow-sm flex justify-between items-center"
            >
            <div>
                <h3 className="font-semibold text-lg">{expense.name}</h3>
                <p className="text-sm text-gray-500">
                {expense.person} · {expense.month}
                </p>
            </div>
            <span className="font-bold text-green-600">
                ${Number(expense.amount).toLocaleString('es-CO')}
            </span>
            </div>
        ))}
        </div>
    )
}