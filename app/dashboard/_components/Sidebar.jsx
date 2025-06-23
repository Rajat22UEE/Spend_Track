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
  const activeIndex = navItems.findIndex(item => item.href === pathname)

  return (
    <aside className="w-64 h-screen ml-5 my-3 p-6 border-r border-gray-800 bg-[#471396] rounded-[2rem] text-white">
      <h2 className="text-2xl font-bold mb-6">SpendTrack</h2>

      <div
        className="radio-container"
        style={{ '--total-radio': navItems.length }}
      >
        {navItems.map(({ label, href, icon: Icon }, idx) => (
          <div key={href}>
            <input
              type="radio"
              name="sidebar"
              id={`radio-${idx}`}
              checked={pathname === href}
              readOnly
              className="hidden"
            />
            <label htmlFor={`radio-${idx}`} className="flex items-center gap-3 px-4 py-3 text-lg">
              <Icon className="w-6 h-6" />
              {label}
              <Link href={href} className="absolute inset-0" />
            </label>
          </div>
        ))}

        <div className="glider-container">
          <div className="glider" style={{ transform: `translateY(${activeIndex * 100}%)` }} />
        </div>
      </div>
    </aside>
  )
}
