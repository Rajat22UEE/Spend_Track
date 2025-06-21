export default function ExpenseTable({ expenses = [], onDelete }) {
  return (
    <table className="w-full bg-white dark:bg-gray-700 rounded shadow mt-4">
      <thead>
        <tr className="bg-gray-100 dark:bg-gray-600 text-left">
          <th className="p-2">Name</th>
          <th className="p-2">Amount</th>
          <th className="p-2">Date</th>
          <th className="p-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map(exp => (
          <tr key={exp.id} className="border-t dark:border-gray-600">
            <td className="p-2">{exp.name}</td>
            <td className="p-2">₹{exp.amount}</td>
            <td className="p-2">{exp.date}</td>
            <td className="p-2">
              <button onClick={() => onDelete?.(exp.id)} className="text-red-600 hover:underline">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
