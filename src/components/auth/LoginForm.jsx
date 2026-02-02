// 📂 src/components/auth/LoginForm.jsx
import { useState } from 'react'
import { User, Lock, Eye, EyeOff } from 'lucide-react'

export default function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  rememberMe,
  setRememberMe,
  loading,
  error,
  onSubmit,
}) {
  // State lokal untuk UI toggle password (karena gak ngaruh ke logic bisnis)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      {/* Input Email */}
      <div className="relative">
        <User className="absolute top-3 left-3 text-gray-400 w-5 h-5" />
        <input
          type="email"
          placeholder="Masukkan Email Anda"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Input Password */}
      <div className="relative">
        <Lock className="absolute top-3 left-3 text-gray-400 w-5 h-5" />
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          autoComplete="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-2.5 right-3 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? (
            <Eye className="w-5 h-5" />
          ) : (
            <EyeOff className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded border border-red-100">
          {error}
        </div>
      )}

      {/* Checkbox Remember Me */}
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="mr-2 text-blue-500 cursor-pointer"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <span className="text-gray-700">Ingat saya</span>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-all duration-300 disabled:bg-blue-300 disabled:cursor-not-allowed"
      >
        {loading ? 'Masuk...' : 'Login'}
      </button>
    </form>
  )
}
