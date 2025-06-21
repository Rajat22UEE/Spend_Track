export default function Chart({ budgets }) {
  const total = budgets.reduce((sum, b) => sum + b.amount, 0)
  const spent = budgets.reduce((sum, b) =>
    sum + b.expenses.reduce((s, e) => s + e.amount, 0), 0)

  const percent = total ? Math.round((spent / total) * 100) : 0

  return (
    <div className="p-6 bg-white dark:bg-gray-700 rounded shadow mb-6">
      <h2 className="text-lg font-bold mb-2">Monthly Budget Usage</h2>
      <div className="w-full bg-gray-200 dark:bg-gray-600 h-4 rounded">
        <div className="bg-green-500 h-4 rounded" style={{ width: `${percent}%` }} />
      </div>
      <p className="mt-2 text-sm">{percent}% of total budget used</p>
    </div>
  )
}
