// PasswordInput.jsx

import { useState, forwardRef } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import PropTypes from 'prop-types'

const PasswordInput = forwardRef(({ label, error, name, ...props }, ref) => {
  const [show, setShow] = useState(false)

  return (
    <div>
      <label htmlFor={name} className="block text-gray-700 text-sm mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          ref={ref}
          type={show ? 'text' : 'password'}
          {...props}
          className="w-full px-3 py-2 pr-10 rounded border border-gray-300 text-sm sm:text-base"
        />
        <span
          onClick={() => setShow(!show)}
          className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
        >
          {show ? <Eye size={20} /> : <EyeOff size={20} />}
        </span>
      </div>
      <p className="text-sm text-red-500 mt-1 min-h-[20px]">
        {error || '\u00A0'}
      </p>
    </div>
  )
})

PasswordInput.displayName = 'PasswordInput'

PasswordInput.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  name: PropTypes.string.isRequired,
}

export default PasswordInput
