'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Wallet,
  Receipt,
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Budgets', href: '/dashboard/budgets', icon: Wallet },
  { label: 'Expenses', href: '/dashboard/expenses', icon: Receipt },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 h-screen p-6 border-r dark:border-gray-800 bg-gray-100 dark:bg-gray-900 rounded-r-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">SpendTrack</h2>
      <nav className="flex flex-col gap-2">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`
                flex items-center gap-3 px-4 py-2 rounded cursor-pointer transition
                ${isActive
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-800'}
              `}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
