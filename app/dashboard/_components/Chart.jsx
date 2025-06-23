'use client'

import { Bar, Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from 'chart.js'
import { Wallet, IndianRupee, PieChart, BarChart } from 'lucide-react'

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
)

export default function Chart({ budgets }) {
  const labels = budgets.map(b => b.name)
  const totalPerBudget = budgets.map(b => b.amount)
  const spentPerBudget = budgets.map(b => b.expenses.reduce((s, e) => s + e.amount, 0))

  const total = totalPerBudget.reduce((a, b) => a + b, 0)
  const spent = spentPerBudget.reduce((a, b) => a + b, 0)
  const remaining = total - spent
  const percent = total ? Math.round((spent / total) * 100) : 0

  const barData = {
    labels,
    datasets: [
      {
        label: 'Total Amount',
        data: totalPerBudget,
        backgroundColor: 'rgba(247,228,121,0.5)', // #f7e479
        borderColor: '#f7e479',
        borderWidth: 1
      },
      {
        label: 'Spent Amount',
        data: spentPerBudget,
        backgroundColor: 'rgba(255,99,132,0.5)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1
      },
    ],
  }

  const pieData = {
    labels,
    datasets: [
      {
        label: 'Spent',
        data: spentPerBudget,
        backgroundColor: totalPerBudget.map((_, i) =>
          `hsl(${(i * 360) / labels.length}, 70%, 60%)`
        ),
        hoverOffset: 10
      },
    ],
  }

  const commonOptions = {
    plugins: {
      legend: { position: 'bottom', labels: { color: 'white' } },
      title: { display: false },
      tooltip: { backgroundColor: '#333', titleColor: '#f7e479', bodyColor: '#fff' }
    },
    maintainAspectRatio: false
  }

  return (
    <div className="mb-6 space-y-6">
      {/* Summary Bar */}
      <div className="bg-[#471396] p-6 rounded-xl shadow-lg text-white">
        <div className="flex flex-col gap-4">
          {/* Heading */}
          <div className="flex items-center gap-2">
            <Wallet className="w-6 h-6 text-[#f7e479]" />
            <h2 className="text-lg font-bold">Budget Summary</h2>
          </div>

          {/* Labels above progress bar */}
          <div className="flex justify-between text-sm md:text-base px-1">
            <p className="flex items-center gap-1 font-semibold text-yellow-200">
              <IndianRupee className="w-4 h-4 text-[#f7e479]" />
              Spent: ₹{spent}
            </p>
            <p
              className={`flex items-center gap-1 font-semibold ${remaining < 0 ? 'text-red-300' : 'text-green-200'
                }`}
            >
              Remaining: ₹{remaining}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/30 rounded-full h-3">
            <div
              className={`h-3 rounded-full ${remaining < 0 ? 'bg-red-400' : 'bg-[#f7e479]'
                }`}
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bar and Pie Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#471396] p-4 rounded-xl shadow-lg">
          <h2 className="text-white font-bold mb-2 flex items-center gap-2">
            <BarChart className="w-5 h-5 text-[#f7e479]" />
            Budget Overview (Bar)
          </h2>
          <div className="h-64">
            <Bar
              data={barData}
              options={{
                ...commonOptions,
                scales: {
                  y: {
                    ticks: { color: 'white' },
                    grid: { color: 'rgba(255,255,255,0.2)' }
                  },
                  x: {
                    ticks: { color: 'white' }
                  }
                }
              }}
            />
          </div>
        </div>

        <div className="bg-[#471396] p-4 rounded-xl shadow-lg">
          <h2 className="text-white font-bold mb-2 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-[#f7e479]" />
            Spending Breakdown (Pie)
          </h2>
          <div className="h-64">
            <Pie data={pieData} options={commonOptions} />
          </div>
        </div>
      </div>
    </div>
  )
}
