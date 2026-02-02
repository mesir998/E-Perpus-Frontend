import { useState } from 'react'
import { Lock, RefreshCcw, Eye, EyeOff } from 'lucide-react'

export default function ProfileCardPassword({
  passForm,
  setPassForm,
  handlePasswordUpdate,
  updateLoading,
  isMurid,
}) {
  // --- STATE UNTUK SHOW/HIDE PASSWORD ---
  const [showOld, setShowOld] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  // --- STYLING ---
  const containerClass = isMurid
    ? 'bg-slate-800 text-white shadow-xl rounded-lg border border-slate-700'
    : 'bg-white text-gray-800 shadow-xl rounded-lg'

  const titleClass = isMurid
    ? 'text-xl font-bold border-b border-slate-600 pb-2 mb-4 flex items-center gap-2'
    : 'text-xl font-bold border-b pb-2 mb-4 flex items-center gap-2'

  // Style input khusus Murid (transparent border)
  const inputStyle = isMurid
    ? {
        backgroundColor: 'transparent',
        borderColor: '#475569', // Slate-600
        color: 'white',
      }
    : {}

  // Warna icon mata (tergantung tema gelap/terang)
  const eyeIconClass = isMurid
    ? 'text-slate-400 hover:text-white'
    : 'text-gray-400 hover:text-gray-600'

  return (
    <div className={containerClass}>
      <form
        onSubmit={handlePasswordUpdate}
        className="p-6 md:p-8 flex flex-col gap-4"
      >
        <h4 className={titleClass}>
          <Lock size={20} /> Ubah Password
        </h4>

        {/* 1. PASSWORD LAMA */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Password Lama
          </label>
          <div className="relative">
            <input
              type={showOld ? 'text' : 'password'}
              className="w-full p-2 pr-10 rounded border focus:ring-2 focus:ring-blue-500 bg-transparent"
              style={inputStyle}
              placeholder="Masukkan password saat ini"
              value={passForm.oldPassword || ''}
              onChange={(e) =>
                setPassForm({ ...passForm, oldPassword: e.target.value })
              }
            />
            <button
              type="button"
              onClick={() => setShowOld(!showOld)}
              className={`absolute right-3 top-1/2 -translate-y-1/2 transition ${eyeIconClass}`}
            >
              {showOld ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
        </div>

        {/* 2. PASSWORD BARU */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Password Baru
          </label>
          <div className="relative">
            <input
              type={showNew ? 'text' : 'password'}
              className="w-full p-2 pr-10 rounded border focus:ring-2 focus:ring-blue-500 bg-transparent"
              style={inputStyle}
              placeholder="Masukkan password baru"
              value={passForm.newPassword || ''}
              onChange={(e) =>
                setPassForm({ ...passForm, newPassword: e.target.value })
              }
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className={`absolute right-3 top-1/2 -translate-y-1/2 transition ${eyeIconClass}`}
            >
              {showNew ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
        </div>

        {/* 3. KONFIRMASI PASSWORD */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Konfirmasi Password Baru
          </label>
          <div className="relative">
            <input
              type={showConfirm ? 'text' : 'password'}
              className="w-full p-2 pr-10 rounded border focus:ring-2 focus:ring-blue-500 bg-transparent"
              style={inputStyle}
              placeholder="Ulangi password baru"
              value={passForm.confirmPassword || ''}
              onChange={(e) =>
                setPassForm({ ...passForm, confirmPassword: e.target.value })
              }
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className={`absolute right-3 top-1/2 -translate-y-1/2 transition ${eyeIconClass}`}
            >
              {showConfirm ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition flex items-center justify-center gap-2"
          disabled={updateLoading}
        >
          <RefreshCcw size={16} />
          {updateLoading ? 'Memperbarui...' : 'Update Password'}
        </button>
      </form>
    </div>
  )
}
