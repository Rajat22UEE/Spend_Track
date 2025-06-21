import Link from 'next/link'

export default function BudgetCard({ title, amount, link }) {
  const card = (
    <div className="p-4 bg-white dark:bg-gray-700 rounded shadow hover:shadow-lg transition cursor-pointer">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="mt-2 text-blue-600 dark:text-blue-400">{amount}</p>
    </div>
  )

  return link ? <Link href={link}>{card}</Link> : card
}
