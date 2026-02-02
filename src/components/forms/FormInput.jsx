import { forwardRef } from 'react'
import PropTypes from 'prop-types'

const FormInput = forwardRef(
  ({ label, error, onlyNumber = false, ...props }, ref) => {
    const handleKeyDown = (e) => {
      if (
        onlyNumber &&
        !/[0-9]/.test(e.key) &&
        e.key !== 'Backspace' &&
        e.key !== 'Tab'
      ) {
        e.preventDefault()
      }
    }

    return (
      <div>
        <label className="block text-gray-700 text-sm mb-1">{label}</label>
        <input
          ref={ref}
          onKeyDown={handleKeyDown}
          {...props}
          className="w-full px-3 py-2 rounded border border-gray-300 text-sm sm:text-base"
        />
        <p className="text-sm text-red-500 mt-1 min-h-[20px]">
          {error || '\u00A0'}
        </p>
      </div>
    )
  }
)

FormInput.displayName = 'FormInput'

FormInput.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  onlyNumber: PropTypes.bool,
}

export default FormInput
