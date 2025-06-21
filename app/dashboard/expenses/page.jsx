'use client'
import { useState, useEffect } from 'react'
import { getCurrentMonthKey, getMonthData, setMonthData } from '../../../lib/storage'
import { v4 as uuidv4 } from 'uuid'
import ExpenseForm from ' @/app/_components/ExpenseForm'

export default function ExpensesPage() {
  const monthKey = getCurrentMonthKey()
  const [data, setData] = useState({ budgets: [] })

  useEffect(() => {
    setData(getMonthData(monthKey))
  }, [])

  const addExpense = exp => {
    const newExp = { id: uuidv4(), ...exp, date: new Date().toISOString().split('T')[0] }
    const updatedBudgets = data.budgets.map(b =>
      b.id === exp.budgetId ? { ...b, expenses: [...b.expenses, newExp] } : b
    )
    const newData = { budgets: updatedBudgets }
    setMonthData(monthKey, newData)
    setData(newData)
  }

  const deleteExpense = (budgetId, expId) => {
    const updatedBudgets = data.budgets.map(b =>
      b.id === budgetId
        ? { ...b, expenses: b.expenses.filter(e => e.id !== expId) }
        : b
    )
    const newData = { budgets: updatedBudgets }
    setMonthData(monthKey, newData)
    setData(newData)
  }

  const allExpenses = data.budgets.flatMap(b =>
    b.expenses.map(e => ({ ...e, budgetName: b.name, budgetId: b.id }))
  )

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Expenses</h2>
      <ExpenseForm budgets={data.budgets} onSave={addExpense} />

      <table className="w-full bg-white dark:bg-gray-700 rounded shadow">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-600 text-left">
            <th className="p-2">Budget</th>
            <th className="p-2">Name</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Date</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {allExpenses.map(e => (
            <tr key={e.id} className="border-t dark:border-gray-600">
              <td className="p-2">{e.budgetName}</td>
              <td className="p-2">{e.name}</td>
              <td className="p-2">₹{e.amount}</td>
              <td className="p-2">{e.date}</td>
              <td className="p-2">
                <button
                  onClick={() => deleteExpense(e.budgetId, e.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
