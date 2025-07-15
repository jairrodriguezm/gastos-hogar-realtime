import { useMemo } from 'react'
import ExpenseForm from './components/ExpenseForm/ExpenseForm'
import ExpenseList from './components/ExpenseList/ExpenseList'
import TotalSummary from './components/TotalSummary/TotalSummary'
import MainNav from './components/MainNav/MainNav'
import type { Expense } from './models/expense'
import { useQuery } from '@apollo/client'
import { GET_EXPENSES } from './graphql/queries'
import logo from './assets/icons/gastos-icon.png'

import './App.scss'

function App() {
  const { data, loading, error, refetch } = useQuery(GET_EXPENSES);
  
  const expenses: Expense[] = data?.gastos ?? [];

  const currentMonth = useMemo(() => {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  }, [])

  const currentMonthTotal = useMemo(() => {
    return expenses
      .filter((e) => e.month === currentMonth)
      .reduce((sum, e) => sum + Number(e.amount), 0)
  }, [expenses, currentMonth])

  const totalAmountValue = useMemo(() => {
    return expenses
      .reduce((sum, e) => sum + Number(e.amount), 0)
  }, [expenses])

  if (loading) return <div className='loading-container'><img src={logo} /></div>
  if (error) return <p>Error loading expenses: {error.message}</p>

  return (
    <main className="expenses">
      <MainNav />
      <ExpenseForm onExpenseSaved={refetch} />
      <TotalSummary totalAmount={totalAmountValue} month={currentMonth} monthTotal={currentMonthTotal}/>
      <ExpenseList expenses={expenses} />
    </main>
  )
}

export default App;