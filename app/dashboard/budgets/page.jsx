'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Wallet,
  IndianRupee,
  Plus,
  Trash2,
  Pencil,
  Check,
  X,
} from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'
import {
  getCurrentMonthKey,
  getMonthData,
  setMonthData,
} from '../../../lib/storage'

export default function BudgetsPage() {
  const [monthKey] = useState(getCurrentMonthKey())
  const [data, setData] = useState({ budgets: [] })
  const [form, setForm] = useState({ name: '', amount: '' })
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)
  const [toast, setToast] = useState('')

  useEffect(() => {
    setData(getMonthData(monthKey))
  }, [])

  const handleCreateBudget = () => {
    if (!form.name.trim() || !form.amount || parseFloat(form.amount) <= 0) return

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
    setShowModal(false)
    showToast('Budget created successfully!')
  }

  const handleEditClick = (b) => {
    setForm({ name: b.name, amount: b.amount })
    setEditingId(b.id)
  }

  const handleEditSave = (id) => {
    const updatedBudgets = data.budgets.map(b =>
      b.id === id ? { ...b, name: form.name, amount: parseFloat(form.amount) } : b
    )
    setMonthData(monthKey, { budgets: updatedBudgets })
    setData({ budgets: updatedBudgets })
    setEditingId(null)
    setForm({ name: '', amount: '' })
    showToast('Budget updated successfully!')
  }

  const handleDeleteConfirmed = () => {
    const updated = { budgets: data.budgets.filter(b => b.id !== confirmDeleteId) }
    setMonthData(monthKey, updated)
    setData(updated)
    setConfirmDeleteId(null)
    showToast('Budget deleted successfully!')
  }

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  return (
    <div className="relative px-4 sm:px-6 lg:px-8">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow z-50 text-sm sm:text-base">
          {toast}
        </div>
      )}

      {/* Page Content Blur When Modal Active */}
      <div
        className={`
        ${showModal || confirmDeleteId ? 'blur-sm scale-95' : ''}
        transition-all duration-300
      `}
      >
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
            <Wallet className="w-6 h-6 text-[#f7e479]" />
            Monthly Budgets
          </h2>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#f7e479] text-black font-semibold rounded-full shadow hover:scale-105 transition"
          >
            <Plus className="w-5 h-5" /> Create Budget
          </button>
        </div>

        {/* Budget Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {data.budgets.map(b => {
            const spent = b.expenses.reduce((s, e) => s + e.amount, 0)
            const remaining = b.amount - spent
            const percent = Math.min((spent / b.amount) * 100, 100)
            const isEditing = editingId === b.id

            if (isEditing) {
              return (
                <div key={b.id} className="bg-[#471396] text-white p-5 pt-12 rounded-xl shadow-lg relative">
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    <button onClick={() => handleEditSave(b.id)}>
                      <Check className="text-green-300 w-5 h-5" />
                    </button>
                    <button onClick={() => { setEditingId(null); setForm({ name: '', amount: '' }) }}>
                      <X className="text-white w-5 h-5" />
                    </button>
                  </div>
                  <input
                    className="w-full mb-2 px-3 py-2 rounded border bg-white text-black"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  <input
                    type="number"
                    className="w-full px-3 py-2 rounded border bg-white text-black"
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  />
                </div>
              )
            }

            return (
              <Link
                key={b.id}
                href={`/dashboard/budgets/${b.id}`}
                className="block bg-[#471396] text-white p-5 pt-12 rounded-xl shadow-lg relative hover:scale-[1.02] transition"
              >
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <button onClick={(e) => { e.preventDefault(); handleEditClick(b) }}>
                    <Pencil className="text-yellow-300 w-5 h-5" />
                  </button>
                  <button onClick={(e) => { e.preventDefault(); setConfirmDeleteId(b.id) }}>
                    <Trash2 className="text-red-300 w-5 h-5" />
                  </button>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-base md:text-lg font-bold">{b.name}</h3>
                  <p className="font-semibold text-sm md:text-base">₹{b.amount}</p>
                </div>
                <div className="text-sm mb-2">
                  <p className="font-semibold text-yellow-200">Spent: ₹{spent}</p>
                  <p className={`font-semibold ${remaining < 0 ? 'text-red-300' : 'text-green-200'}`}>
                    Remaining: ₹{remaining}
                  </p>
                </div>
                <div className="w-full bg-white/30 rounded-full h-3 mt-2">
                  <div
                    className={`h-3 rounded-full ${remaining < 0 ? 'bg-red-400' : 'bg-[#f7e479]'}`}
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Create Budget Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-black/40 px-4">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-2xl w-full max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-4 text-2xl text-gray-500 hover:text-red-500"
            >
              ×
            </button>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#f7e479]" /> Create New Budget
            </h3>
            <div className="space-y-4">
              <div className="flex items-center border rounded px-3 py-2 gap-2">
                <Wallet className="w-5 h-5 text-[#471396]" />
                <input
                  className="flex-1 bg-transparent outline-none"
                  placeholder="Budget Category"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="flex items-center border rounded px-3 py-2 gap-2">
                <IndianRupee className="w-5 h-5 text-[#471396]" />
                <input
                  className="flex-1 bg-transparent outline-none"
                  placeholder="Amount"
                  type="number"
                  value={form.amount}
                  onChange={e => setForm({ ...form, amount: e.target.value })}
                />
              </div>
              <button
                onClick={handleCreateBudget}
                className="w-full bg-[#f7e479] text-black py-2 rounded font-semibold hover:scale-105 transition"
              >
                Add Budget
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-black/40 px-4">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-2xl w-full max-w-md relative">
            <h3 className="text-lg font-semibold text-center mb-4 flex items-center justify-center gap-2 text-red-600">
              <Trash2 className="w-5 h-5" /> Confirm Deletion
            </h3>
            <p className="text-center text-gray-700 dark:text-gray-300 mb-6">
              Are you sure you want to delete this budget? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
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
