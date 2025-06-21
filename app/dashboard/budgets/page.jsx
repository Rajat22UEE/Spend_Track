'use client'
import { useEffect, useState } from 'react'
import { getCurrentMonthKey, getMonthData, setMonthData } from '../../../lib/storage'
import { v4 as uuidv4 } from 'uuid'

export default function BudgetsPage() {
  const [monthKey] = useState(getCurrentMonthKey())
  const [data, setData] = useState({ budgets: [] })
  const [form, setForm] = useState({ name: '', amount: '' })

  useEffect(() => {
    setData(getMonthData(monthKey))
  }, [])

  const handleCreateBudget = () => {
    const newBudget = {
      id: uuidv4(),
      name: form.name,
      amount: parseFloat(form.amount),
      expenses: []
    }
    const updated = { budgets: [...data.budgets, newBudget] }
    setMonthData(monthKey, updated)
    setData(updated)
    setForm({ name: '', amount: '' })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Create Budget</h2>
      <div className="flex gap-4">
        <input
          className="border px-3 py-2 rounded w-1/3"
          placeholder="Budget Category"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border px-3 py-2 rounded w-1/3"
          placeholder="Amount"
          type="number"
          value={form.amount}
          onChange={e => setForm({ ...form, amount: e.target.value })}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleCreateBudget}>
          Add
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {data.budgets.map(b => {
          const spent = b.expenses.reduce((s, e) => s + e.amount, 0)
          return (
            <div key={b.id} className="p-4 bg-white dark:bg-gray-700 rounded shadow">
              <h3 className="text-lg font-bold">{b.name}</h3>
              <p>Budget: ₹{b.amount}</p>
              <p>Spent: ₹{spent}</p>
              <p>Remaining: ₹{b.amount - spent}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
