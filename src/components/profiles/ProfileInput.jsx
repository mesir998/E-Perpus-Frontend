import { Upload } from 'lucide-react'

// ========================================================================
// 🧩 ProfileInput - Input field universal (Text / TextArea)
// ========================================================================
export const ProfileInput = ({
  label,
  name,
  value,
  onChange,
  disabled,
  type = 'text',
  placeholder = '',
  isTextArea = false,
  className = '',
}) => {
  const inputClasses = `
    mt-1 p-2 w-full border rounded-md
    dark:bg-gray-700 dark:text-white
    ${disabled ? 'bg-gray-100 dark:bg-gray-700' : 'bg-white'}
  `

  return (
    <div className={`w-full ${className}`}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
        {label}
      </label>

      {isTextArea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          className={inputClasses}
          rows="3"
        />
      ) : (
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          className={inputClasses}
        />
      )}
    </div>
  )
}

// ========================================================================
// 📌 ProfileDisplay - Read-only field (untuk data view mode)
// ========================================================================
export const ProfileDisplay = ({ label, value }) => (
  <div className="w-full">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
      {label}
    </label>

    <p
      className="mt-1 p-2 w-full rounded-md border 
      bg-gray-50 dark:bg-gray-700/50 
      text-gray-900 dark:text-gray-100"
    >
      {value || '-'}
    </p>
  </div>
)

// ========================================================================
// 📁 ProfileFileInput - Upload foto profil (FIXED ALIGNMENT)
// ========================================================================
export const ProfileFileInput = ({
  selectedFile,
  previewUrl,
  fileInputRef,
  handleFileChange,
  isEditing,
}) => (
  // ✅ FIX: Tambah flex-col & items-center biar konten gak geser ke kiri
  <div className="flex flex-col items-center w-full text-center">
    {/* 📸 Preview Foto */}
    <img
      src={previewUrl || '/assets/default-profile.png'}
      alt="Foto Profil"
      className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-gray-300 shadow-sm"
    />

    {/* 🎯 Input File (muncul saat edit) */}
    {isEditing && (
      <div className="mb-4 w-full flex justify-center">
        <input
          id="profile-upload-input"
          ref={fileInputRef}
          type="file"
          name="profile_picture"
          accept="image/jpeg,image/png,image/jpg"
          onChange={handleFileChange}
          className="hidden"
        />

        <label
          htmlFor="profile-upload-input"
          className="px-4 py-2 border rounded cursor-pointer text-sm 
            flex items-center justify-center gap-2
            bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 
            dark:text-white transition min-w-[160px]"
        >
          <Upload size={16} />
          {selectedFile ? 'Ganti Foto' : 'Pilih Foto Baru'}
        </label>
      </div>
    )}
  </div>
)
