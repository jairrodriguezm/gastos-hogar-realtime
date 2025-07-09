// import { useState } from 'react'
// import './App.css'
// import { gql, useQuery, useMutation } from '@apollo/client'
// import type { Gasto } from './types'

// const GET_GASTOS = gql`
//   query {
//     gastos {
//       id
//       nombre
//       valor
//       autor
//       mes
//     }
//   }
// `

// const CREATE_GASTO = gql`
//   mutation CrearGasto($nombre: String!, $valor: numeric!, $autor: String!, $mes: String!) {
//     insert_gastos_one(object: { nombre: $nombre, valor: $valor, autor: $autor, mes: $mes }) {
//       id
//     }
//   }
// `

// function App() {
//   const { data, loading, error, refetch } = useQuery<{ gastos: Gasto[] }>(GET_GASTOS)
//   const [crearGasto] = useMutation(CREATE_GASTO)

//   const [formData, setFormData] = useState({
//     nombre: '',
//     valor: '',
//     autor: '',
//     mes: '',
//   })

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     if (name === 'valor') {
//       const formateado = formatearMiles(value)
//       setFormData((prev) => ({ ...prev, valor: formateado }))
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }))
//     }
//   }

//   const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     const valorLimpio = parseInt(formData.valor.replace(/\./g, ''))
//     await crearGasto({
//       variables: { 
//         nombre: formData.nombre,
//         valor: valorLimpio,
//         autor: formData.autor,
//         mes: formData.mes
//       }
//     })
//     setFormData({ nombre: '', valor: '', autor: '', mes: '' })
//     refetch()
//   }

//   const formatearMiles = (valor: string) => {
//     // Remueve todo excepto números
//     const soloNumeros = valor.replace(/\D/g, '')
//     // Convierte en número y formatea
//     return soloNumeros.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
//   }

//   if (loading) return <p>Cargando...</p>
//   if (error) return <p>Error: {error.message}</p>
//   if (!data) return null

//   return (
//     <div style={{ padding: 20 }}>
//       <h1>Gastos del hogar</h1>

//       <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
//         <input
//           type="text"
//           name="nombre"
//           placeholder="Nombre"
//           value={formData.nombre}
//           onChange={handleInputChange}
//         />
//         <input
//           type="text"
//           name="valor"
//           placeholder="Valor en COP"
//           value={formData.valor}
//           onChange={handleInputChange}
//         />
//         <select name="autor" value={formData.autor} onChange={handleSelectChange}>
//           <option value="">Selecciona autor</option>
//           <option value="Jair">Jair</option>
//           <option value="Anyelly">Anyelly</option>
//         </select>
//         <input
//           type="text"
//           name="mes"
//           placeholder="Ej: julio 2025"
//           value={formData.mes}
//           onChange={handleInputChange}
//         />
//         <button type="submit">Agregar gasto</button>
//       </form>

//       <ul>
//         {data?.gastos.map((g: Gasto) => (
//           <li key={g.id}>
//             {g.nombre} - {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(g.valor)} ({g.autor} / {g.mes})
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

// export default App


import { useMemo } from 'react'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import TotalSummary from './components/TotalSummary'
import type { Expense } from './models/expense'
import { useQuery } from '@apollo/client'
import { GET_EXPENSES } from './graphql/queries'

function App() {
  const { data, loading, error, refetch } = useQuery(GET_EXPENSES);
  
  const expenses: Expense[] = data?.gastos ?? []

  const currentMonth = useMemo(() => {
    return new Date().toLocaleString('default', {
      month: 'long',
      year: 'numeric'
    })
  }, [])

  const currentMonthTotal = useMemo(() => {
    return expenses
      .filter((e) => e.month === currentMonth)
      .reduce((sum, e) => sum + Number(e.amount), 0)
  }, [expenses, currentMonth])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error loading expenses: {error.message}</p>

  return (
    <main className="max-w-md mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">Gastos Mensuales</h1>

      <ExpenseForm onExpenseSaved={refetch} />

      <ExpenseList expenses={expenses} />

      <TotalSummary amount={currentMonthTotal} />
    </main>
  )
}

export default App;