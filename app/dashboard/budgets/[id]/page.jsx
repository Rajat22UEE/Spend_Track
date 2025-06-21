'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { getCurrentMonthKey, getMonthData, setMonthData } from '../../../../lib/storage'
import { v4 as uuidv4 } from 'uuid'
import BudgetForm from ' @/app/_components/BudgetForm'
import ExpenseForm from ' @/app/_components/ExpenseForm'
// import BudgetForm from '@/components/BudgetForm'
// import ExpenseForm from '@/components/ExpenseForm'

export default function BudgetDetail() {
  const { id } = useParams() // ✅ use the hook
  const router = useRouter()
  const monthKey = getCurrentMonthKey()

  const [data, setData] = useState({ budgets: [] })
  const [budget, setBudget] = useState(null)

  useEffect(() => {
    const d = getMonthData(monthKey)
    setData(d)
    const foundBudget = d.budgets.find(b => b.id === id)
    setBudget(foundBudget)
  }, [id])

  if (!budget) return <p>Loading budget...</p>

  const saveBudget = updated => {
    const updatedBudgets = data.budgets.map(b =>
      b.id === budget.id ? { ...b, ...updated } : b
    )
    const newData = { budgets: updatedBudgets }
    setMonthData(monthKey, newData)
    setData(newData)
    setBudget(updatedBudgets.find(b => b.id === budget.id))
  }

  const addExpense = exp => {
    const newExp = { id: uuidv4(), ...exp, date: new Date().toISOString().split('T')[0] }
    const updatedBudgets = data.budgets.map(b =>
      b.id === budget.id ? { ...b, expenses: [...b.expenses, newExp] } : b
    )
    const newData = { budgets: updatedBudgets }
    setMonthData(monthKey, newData)
    setData(newData)
    setBudget(updatedBudgets.find(b => b.id === budget.id))
  }

  const deleteExpense = expId => {
    const updatedBudgets = data.budgets.map(b =>
      b.id === budget.id
        ? { ...b, expenses: b.expenses.filter(e => e.id !== expId) }
        : b
    )
    const newData = { budgets: updatedBudgets }
    setMonthData(monthKey, newData)
    setData(newData)
    setBudget(updatedBudgets.find(b => b.id === budget.id))
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{budget.name}</h2>
      <BudgetForm initial={budget} onSave={saveBudget} />
      <ExpenseForm budgets={[budget]} onSave={addExpense} />

      <h3 className="text-xl mt-6 mb-2">Expenses</h3>
      <ul className="space-y-2">
        {budget.expenses.map(e => (
          <li key={e.id} className="flex justify-between bg-white dark:bg-gray-700 px-4 py-2 rounded shadow">
            <div>
              <p>{e.name}</p>
              <p className="text-sm text-gray-500">{e.date}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => deleteExpense(e.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
