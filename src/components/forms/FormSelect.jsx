// forms/FormSelect.jsx

import { forwardRef } from 'react'
import PropTypes from 'prop-types'

const FormSelect = forwardRef(
  ({ label, options, error, name, ...props }, ref) => {
    return (
      <div>
        <label htmlFor={name} className="block text-gray-700 text-sm mb-1">
          {label}
        </label>
        <select
          id={name}
          name={name}
          ref={ref}
          {...props}
          className="w-full px-3 py-2 rounded border border-gray-300 text-sm sm:text-base"
        >
          <option value="">Pilih {label}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <p className="text-sm text-red-500 mt-1 min-h-[20px]">
          {error || '\u00A0'}
        </p>
      </div>
    )
  }
)

FormSelect.displayName = 'FormSelect'

FormSelect.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  error: PropTypes.string,
  name: PropTypes.string.isRequired,
}

export default FormSelect
