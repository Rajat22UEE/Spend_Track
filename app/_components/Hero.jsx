import Link from 'next/link'

export default function Hero() {
  return (
    <section className="text-center py-24 px-4 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-4xl font-bold mb-4">Take Control of Your Finances</h2>
      <p className="text-lg mb-6">Track budgets, manage expenses, and stay on top of your spending.</p>
      <Link href="/dashboard" className="bg-blue-600 text-white px-6 py-3 rounded text-lg hover:bg-blue-700">
        Get Started
      </Link>
    </section>
  )
}
