'use client'
import { useState } from 'react'

export default function BudgetForm({ initial = {}, onSave }) {
  const [name, setName] = useState(initial.name || '')
  const [amount, setAmount] = useState(initial.amount || '')

  const handleSubmit = e => {
    e.preventDefault()
    if (!name || !amount) return
    onSave({ name, amount: parseFloat(amount) })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <div>
        <label className="block font-medium">Budget Name</label>
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
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Save Budget
      </button>
    </form>
  )
}
