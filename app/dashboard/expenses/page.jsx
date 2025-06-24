'use client'

import { useState, useEffect } from 'react'
import { getCurrentMonthKey, getMonthData, setMonthData } from '../../../lib/storage'
import { v4 as uuidv4 } from 'uuid'
import {
  Plus,
  Trash2,
  CalendarDays,
  Receipt,
  IndianRupee,
  FolderKanban,
  X
} from 'lucide-react'

export default function ExpensesPage() {
  const monthKey = getCurrentMonthKey()
  const [data, setData] = useState({ budgets: [] })
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({
    budgetId: '',
    expenseName: '',
    expenseAmount: ''
  })
  const [confirmDelete, setConfirmDelete] = useState(null)

  useEffect(() => {
    setData(getMonthData(monthKey))
  }, [])

  const addExpense = () => {
    if (!form.budgetId || !form.expenseName || !form.expenseAmount) return
    const newExp = {
      id: uuidv4(),
      name: form.expenseName,
      amount: parseFloat(form.expenseAmount),
      budgetId: form.budgetId,
      date: new Date().toISOString().split('T')[0]
    }
    const updatedBudgets = data.budgets.map(b =>
      b.id === form.budgetId ? { ...b, expenses: [...b.expenses, newExp] } : b
    )
    const newData = { budgets: updatedBudgets }
    setMonthData(monthKey, newData)
    setData(newData)
    setShowModal(false)
    setForm({ budgetId: '', expenseName: '', expenseAmount: '' })
  }

  const confirmDeleteExpense = (budgetId, id) => {
    setConfirmDelete({ budgetId, id })
  }

  const handleDeleteConfirmed = () => {
    const { budgetId, id } = confirmDelete
    const updatedBudgets = data.budgets.map(b =>
      b.id === budgetId
        ? { ...b, expenses: b.expenses.filter(e => e.id !== id) }
        : b
    )
    const newData = { budgets: updatedBudgets }
    setMonthData(monthKey, newData)
    setData(newData)
    setConfirmDelete(null)
  }

  const allExpenses = data.budgets.flatMap(b =>
    b.expenses.map(e => ({ ...e, budgetName: b.name, budgetId: b.id }))
  )

  return (
    <div className="relative px-4 sm:px-6 lg:px-8">
      {/* Blur background */}
      <div className={showModal || confirmDelete ? 'blur-sm scale-95 transition-all duration-300' : ''}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
            <Receipt className="w-7 h-7 text-[#f7e479]" />
            All Expenses
          </h2>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#f7e479] text-black font-semibold rounded-full shadow hover:scale-105 transition"
          >
            <Plus className="w-5 h-5" /> Add Expense
          </button>
        </div>

        {/* Table Wrapper for Mobile Scroll */}
        <div className="overflow-x-auto rounded-xl shadow-lg">
          <table className="min-w-[600px] w-full bg-[#471396] rounded-xl">
            <thead>
              <tr className="text-left text-white text-sm md:text-base">
                <th className="p-3"><FolderKanban className="w-4 h-4 inline" /> Budget</th>
                <th className="p-3"><Receipt className="w-4 h-4 inline" /> Name</th>
                <th className="p-3"><IndianRupee className="w-4 h-4 inline" /> Amount</th>
                <th className="p-3"><CalendarDays className="w-4 h-4 inline" /> Date</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {allExpenses.map(e => (
                <tr key={e.id} className="text-white bg-[#471396] hover:bg-[#ffcc00] hover:text-black transition text-sm">
                  <td className="p-3 whitespace-nowrap">{e.budgetName}</td>
                  <td className="p-3 whitespace-nowrap">{e.name}</td>
                  <td className="p-3 whitespace-nowrap">₹{e.amount}</td>
                  <td className="p-3 whitespace-nowrap">{e.date}</td>
                  <td className="p-3 whitespace-nowrap">
                    <button
                      onClick={() => confirmDeleteExpense(e.budgetId, e.id)}
                      className="text-red-400 hover:text-red-600 flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Expense Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center px-4 backdrop-blur-sm bg-black/40">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl w-full max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-4 text-2xl text-gray-500 hover:text-red-500"
            >
              <X />
            </button>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#471396]">
              <Plus className="w-5 h-5 text-[#f7e479]" /> Add New Expense
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1">
                  <FolderKanban className="w-4 h-4" /> Budget Category
                </label>
                <select
                  value={form.budgetId}
                  onChange={e => setForm({ ...form, budgetId: e.target.value })}
                  className="w-full mt-1 p-2 rounded border bg-transparent dark:bg-gray-800 text-black dark:text-white"
                >
                  <option value="">Select Budget</option>
                  {data.budgets.map(b => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1">
                  <Receipt className="w-4 h-4" /> Expense Name
                </label>
                <input
                  type="text"
                  value={form.expenseName}
                  onChange={e => setForm({ ...form, expenseName: e.target.value })}
                  className="w-full mt-1 p-2 rounded border bg-transparent dark:bg-gray-800 text-black dark:text-white"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1">
                  <IndianRupee className="w-4 h-4" /> Spent Amount
                </label>
                <input
                  type="number"
                  value={form.expenseAmount}
                  onChange={e => setForm({ ...form, expenseAmount: e.target.value })}
                  className="w-full mt-1 p-2 rounded border bg-transparent dark:bg-gray-800 text-black dark:text-white"
                />
              </div>
              <button
                onClick={addExpense}
                className="w-full bg-[#f7e479] text-black py-2 rounded font-semibold hover:scale-105 transition"
              >
                Save Expense
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex justify-center items-center px-4 backdrop-blur-sm bg-black/40">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-2xl w-full max-w-md relative">
            <h3 className="text-lg font-semibold text-center mb-4 flex items-center justify-center gap-2 text-red-600">
              <Trash2 className="w-5 h-5" /> Confirm Deletion
            </h3>
            <p className="text-center text-gray-700 dark:text-gray-300 mb-6">
              Are you sure you want to delete this expense? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <button
                onClick={handleDeleteConfirmed}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-semibold flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
              <button
                onClick={() => setConfirmDelete(null)}
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
