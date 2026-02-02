// 📂 src/components/admin/components/books/InputField.jsx

export default function InputField({
  label,
  name,
  value,
  handleChange,
  type = 'text',
  placeholder = '',
  min,
  note,
}) {
  return (
    <div className="w-full">
      <label className="block mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        required
        min={min}
        placeholder={placeholder}
        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      />
      {note && <p className="text-xs text-gray-500 mt-1">{note}</p>}
    </div>
  )
}
