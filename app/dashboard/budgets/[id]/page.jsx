'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { getCurrentMonthKey, getMonthData, setMonthData } from '../../../../lib/storage'
import { v4 as uuidv4 } from 'uuid'
import {
  Plus,
  X,
  Calendar,
  IndianRupee,
  Pencil,
  Trash2,
  FileText
} from 'lucide-react'

export default function BudgetDetail() {
  const { id } = useParams()
  const monthKey = getCurrentMonthKey()

  const [data, setData] = useState({ budgets: [] })
  const [budget, setBudget] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [editingExpenseId, setEditingExpenseId] = useState(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)

  const [form, setForm] = useState({
    name: '',
    amount: '',
    expenseName: '',
    expenseAmount: ''
  })

  useEffect(() => {
    const d = getMonthData(monthKey)
    setData(d)
    const foundBudget = d.budgets.find(b => b.id === id)
    setBudget(foundBudget)
  }, [id])

  if (!budget) return <p>Loading budget...</p>

  const updateBudget = () => {
    if (!form.expenseName || !form.expenseAmount) return

    const updatedBudgets = data.budgets.map(b => {
      if (b.id !== budget.id) return b

      const updatedExpenses = editingExpenseId
        ? b.expenses.map(e =>
            e.id === editingExpenseId
              ? { ...e, name: form.expenseName, amount: parseFloat(form.expenseAmount), date: new Date().toISOString().split('T')[0] }
              : e
          )
        : [
            ...b.expenses,
            {
              id: uuidv4(),
              name: form.expenseName,
              amount: parseFloat(form.expenseAmount),
              date: new Date().toISOString().split('T')[0]
            }
          ]

      return {
        ...b,
        name: form.name,
        amount: parseFloat(form.amount),
        expenses: updatedExpenses
      }
    })

    const updatedData = { budgets: updatedBudgets }
    setMonthData(monthKey, updatedData)
    setData(updatedData)
    setBudget(updatedBudgets.find(b => b.id === budget.id))
    setForm({ name: '', amount: '', expenseName: '', expenseAmount: '' })
    setEditingExpenseId(null)
    setShowModal(false)
  }

  const handleDeleteConfirmed = () => {
    const updatedBudgets = data.budgets.map(b =>
      b.id === budget.id
        ? { ...b, expenses: b.expenses.filter(e => e.id !== confirmDeleteId) }
        : b
    )
    const newData = { budgets: updatedBudgets }
    setMonthData(monthKey, newData)
    setData(newData)
    setBudget(updatedBudgets.find(b => b.id === budget.id))
    setConfirmDeleteId(null)
  }

  const handleEdit = exp => {
    setForm({
      name: budget.name,
      amount: budget.amount,
      expenseName: exp.name,
      expenseAmount: exp.amount
    })
    setEditingExpenseId(exp.id)
    setShowModal(true)
  }

  return (
    <div className="relative">
      <div className={showModal || confirmDeleteId ? 'blur-sm scale-95 transition-all duration-300' : ''}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#f7e479]" />
            {budget.name}
          </h2>
          <button
            onClick={() => {
              setForm({
                name: budget.name,
                amount: budget.amount,
                expenseName: '',
                expenseAmount: ''
              })
              setShowModal(true)
            }}
            className="flex items-center gap-2 px-4 py-2 bg-[#f7e479] text-black font-semibold rounded-full shadow hover:scale-105 transition"
          >
            <Plus className="w-4 h-4" /> Add Expense
          </button>
        </div>

        <h3 className="text-xl mb-2 text-white font-semibold">Expenses</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {budget.expenses.map(e => (
            <li
              key={e.id}
              className="bg-[#471396] text-white p-4 rounded-xl shadow flex flex-col justify-between"
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-lg font-bold flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#f7e479]" />
                  {e.name}
                </h4>
                <p className="font-semibold flex items-center gap-1 text-[#f7e479]">
                  <IndianRupee className="w-4 h-4" /> ₹{e.amount}
                </p>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-300">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> {e.date}
                </span>
                <div className="flex gap-3">
                  <button onClick={() => handleEdit(e)}>
                    <Pencil className="w-4 h-4 text-yellow-200 hover:scale-110 transition" />
                  </button>
                  <button onClick={() => setConfirmDeleteId(e.id)}>
                    <Trash2 className="w-4 h-4 text-red-300 hover:scale-110 transition" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-black/40">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl w-full max-w-md relative">
            <button
              onClick={() => {
                setShowModal(false)
                setEditingExpenseId(null)
              }}
              className="absolute top-2 right-4 text-2xl text-gray-500 hover:text-red-500"
            >
              <X />
            </button>
            <h3 className="text-xl font-bold mb-4 text-[#471396] flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#f7e479]" />
              {editingExpenseId ? 'Edit Expense' : 'Add New Expense'}
            </h3>
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-600 dark:text-gray-300">Budget Category</label>
                <input
                  className="px-3 py-2 rounded border bg-transparent dark:bg-gray-800 text-black dark:text-white"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-600 dark:text-gray-300">Budget Amount</label>
                <input
                  type="number"
                  className="px-3 py-2 rounded border bg-transparent dark:bg-gray-800 text-black dark:text-white"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-600 dark:text-gray-300">Expense Name</label>
                <input
                  className="px-3 py-2 rounded border bg-transparent dark:bg-gray-800 text-black dark:text-white"
                  value={form.expenseName}
                  onChange={(e) => setForm({ ...form, expenseName: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-600 dark:text-gray-300">Spent Amount</label>
                <input
                  type="number"
                  className="px-3 py-2 rounded border bg-transparent dark:bg-gray-800 text-black dark:text-white"
                  value={form.expenseAmount}
                  onChange={(e) => setForm({ ...form, expenseAmount: e.target.value })}
                />
              </div>
              <button
                onClick={updateBudget}
                className="w-full bg-[#f7e479] text-black py-2 rounded font-semibold hover:scale-105 transition"
              >
                {editingExpenseId ? 'Update Expense' : 'Save Expense'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-black/40">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-2xl w-full max-w-md relative">
            <h3 className="text-lg font-semibold text-center mb-4 flex items-center justify-center gap-2 text-red-600">
              <Trash2 className="w-5 h-5" /> Confirm Deletion
            </h3>
            <p className="text-center text-gray-700 dark:text-gray-300 mb-6">
              Are you sure you want to delete this expense? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDeleteConfirmed}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-semibold flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded-md font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
