'use client'
import { useEffect, useState } from 'react'
import { getMonthData, getCurrentMonthKey } from '../../lib/storage'
import BudgetCard from '../_components/BudgetCard'
import Chart from './_components/Chart'
import MonthSelector from '../_components/MonthSelector'

export default function Dashboard() {
  const [month, setMonth] = useState(getCurrentMonthKey())
  const [data, setData] = useState({ budgets: [] })

  useEffect(() => {
    setData(getMonthData(month))
  }, [month])

  const totalBudget = data.budgets.reduce((sum, b) => sum + b.amount, 0)
  const totalSpent = data.budgets.reduce((sum, b) => sum + b.expenses.reduce((s, e) => s + e.amount, 0), 0)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <MonthSelector month={month} setMonth={setMonth} />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <BudgetCard title="Total Budget" amount={totalBudget} />
        <BudgetCard title="Total Spent" amount={totalSpent} />
        <BudgetCard title="No. of Budgets" amount={data.budgets.length} />
      </div>

      <Chart budgets={data.budgets} />

      <h2 className="text-xl mt-8 mb-2">Budgets Overview</h2>
      <div className="grid grid-cols-2 gap-4">
        {data.budgets.map(b => {
          const spent = b.expenses.reduce((s, e) => s + e.amount, 0)
          return (
            <BudgetCard
              key={b.id}
              title={b.name}
              amount={`₹${spent} spent of ₹${b.amount}`}
              link={`/dashboard/budgets/${b.id}`}
            />
          )
        })}
      </div>
    </div>
  )
}
