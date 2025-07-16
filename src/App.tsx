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

  if (loading) return <div className='loading-container'><img src={logo} /></div>
  if (error) return <p>Error loading expenses: {error.message}</p>

  return (
    <main className="expenses">
      <MainNav />
      <ExpenseForm onExpenseSaved={refetch} />
      <TotalSummary expenses={expenses} />
      <ExpenseList expenses={expenses} />
    </main>
  )
}

export default App;