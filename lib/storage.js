export const getCurrentMonthKey = () => {
  const today = new Date()
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`
}

export const getMonthData = (monthKey = getCurrentMonthKey()) => {
  const data = JSON.parse(localStorage.getItem('spendtrack_data') || '{}')
  return data[monthKey] || { budgets: [] }
}

export const setMonthData = (monthKey, monthData) => {
  const data = JSON.parse(localStorage.getItem('spendtrack_data') || '{}')
  data[monthKey] = monthData
  localStorage.setItem('spendtrack_data', JSON.stringify(data))
}
