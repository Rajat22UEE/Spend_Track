'use client'
import { useState, useEffect } from 'react'

export default function MonthSelector({ month, setMonth }) {
  return (
    <select
      value={month}
      onChange={e => setMonth(e.target.value)}
      className="border px-3 py-1 rounded"
    >
      {[...Array(12)].map((_, i) => {
        const date = new Date()
        date.setMonth(i)
        const monthKey = `${date.getFullYear()}-${String(i + 1).padStart(2, '0')}`
        return (
          <option key={monthKey} value={monthKey}>
            {date.toLocaleString('default', { month: 'long' })} {date.getFullYear()}
          </option>
        )
      })}
    </select>
  )
}
