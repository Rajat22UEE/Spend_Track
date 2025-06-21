export default function ExpenseCard({ name, amount, date, onDelete }) {
  return (
    <div className="p-4 border rounded bg-white dark:bg-gray-700 shadow-sm flex justify-between items-center">
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
      <div className="flex gap-3 items-center">
        <span className="text-red-500 font-semibold">₹{amount}</span>
        {onDelete && (
          <button onClick={onDelete} className="text-red-600 hover:underline text-sm">Delete</button>
        )}
      </div>
    </div>
  )
}
