// 📂 src/views/Login.jsx
import { Link } from 'react-router-dom'
import { useLogin } from '../../hooks/useLogin' // Import Hook
import LoginForm from '../auth/LoginForm'

function Login() {
  // Panggil semua logic dari Hook
  const {
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    error,
    loading,
    handleLogin,
  } = useLogin()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-100 to-blue-200 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 md:p-10 w-full max-w-md">
        {/* Header Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/assets/logo.png"
            alt="Logo"
            className="w-24 h-24 object-contain hover:scale-105 transition-transform"
          />
        </div>

        {/* Modular Form Component */}
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
          loading={loading}
          error={error}
          onSubmit={handleLogin}
        />

        {/* Footer Link */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Belum punya akun?{' '}
          <Link
            to="/register"
            className="text-blue-500 hover:underline font-medium hover:text-blue-700 transition-colors"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
