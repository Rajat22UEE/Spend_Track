'use client'
import { useEffect, useState } from 'react'
import { getMonthData, getCurrentMonthKey } from '../../lib/storage'
import Chart from './_components/Chart'
import MonthSelector from '../_components/MonthSelector'

import {
  Wallet,
  IndianRupee,
  BarChart2,
  Folder,
} from 'lucide-react'

export default function Dashboard() {
  const [month, setMonth] = useState(getCurrentMonthKey())
  const [data, setData] = useState({ budgets: [] })

  useEffect(() => {
    setData(getMonthData(month))
  }, [month])

  const totalBudget = data.budgets.reduce((sum, b) => sum + b.amount, 0)
  const totalSpent = data.budgets.reduce(
    (sum, b) => sum + b.expenses.reduce((s, e) => s + e.amount, 0),
    0
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <MonthSelector month={month} setMonth={setMonth} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-[#471396] text-white p-5 rounded-xl shadow-lg flex items-center gap-4">
          <Wallet className="w-8 h-8 text-[#f7e479]" />
          <div>
            <h3 className="text-lg font-bold mb-1">Total Budget</h3>
            <p className="text-xl font-semibold">₹{totalBudget}</p>
          </div>
        </div>
        <div className="bg-[#471396] text-white p-5 rounded-xl shadow-lg flex items-center gap-4">
          <IndianRupee className="w-8 h-8 text-[#f7e479]" />
          <div>
            <h3 className="text-lg font-bold mb-1">Total Spent</h3>
            <p className="text-xl font-semibold">₹{totalSpent}</p>
          </div>
        </div>
        <div className="bg-[#471396] text-white p-5 rounded-xl shadow-lg flex items-center gap-4">
          <Folder className="w-8 h-8 text-[#f7e479]" />
          <div>
            <h3 className="text-lg font-bold mb-1">No. of Budgets</h3>
            <p className="text-xl font-semibold">{data.budgets.length}</p>
          </div>
        </div>
      </div>

      <Chart budgets={data.budgets} />

      <h2 className="text-xl mt-8 mb-2 text-white font-bold">Budgets Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.budgets.map(b => {
          const spent = b.expenses.reduce((s, e) => s + e.amount, 0)
          const percent = Math.min((spent / b.amount) * 100, 100)
          const remaining = b.amount - spent

          return (
            <div
              key={b.id}
              className="bg-[#471396] text-white p-5 rounded-xl shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <BarChart2 className="w-5 h-5 text-[#f7e479]" /> {b.name}
                </h3>
                <p className="font-semibold">₹{b.amount}</p>
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
            </div>
          )
        })}
      </div>
    </div>
  )
}
