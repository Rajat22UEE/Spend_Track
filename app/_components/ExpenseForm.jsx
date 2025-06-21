'use client'
import { useState } from 'react'

export default function ExpenseForm({ initial = {}, budgets = [], onSave }) {
  const [name, setName] = useState(initial.name || '')
  const [amount, setAmount] = useState(initial.amount || '')
  const [budgetId, setBudgetId] = useState(initial.budgetId || budgets[0]?.id || '')

  const handleSubmit = e => {
    e.preventDefault()
    if (!name || !amount || !budgetId) return
    onSave({ name, amount: parseFloat(amount), budgetId })
    setName(''); setAmount('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <div>
        <label className="block font-medium">Budget Category</label>
        <select
          className="border px-3 py-2 rounded w-full"
          value={budgetId}
          onChange={e => setBudgetId(e.target.value)}
        >
          {budgets.map(b => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block font-medium">Expense Name</label>
        <input
          className="border px-3 py-2 rounded w-full"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div>
        <label className="block font-medium">Amount</label>
        <input
          type="number"
          className="border px-3 py-2 rounded w-full"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Expense
      </button>
    </form>
  )
}
