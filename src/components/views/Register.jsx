// 📂 src/views/Register.jsx
import { useRegister } from '../../hooks/useRegister' // Import Hook
import RegisterForm from '../auth/RegisterForm'

function Register() {
  // Panggil Logic
  const {
    register,
    handleSubmit,
    errors,
    loading,
    onSubmit,
    selectedKelas,
    handleKelasChange,
  } = useRegister()

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-5xl bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 overflow-y-auto max-h-screen">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Formulir Registrasi
        </h2>

        {/* Panggil Form Modular */}
        <RegisterForm
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          loading={loading}
          onSubmit={onSubmit}
          selectedKelas={selectedKelas}
          handleKelasChange={handleKelasChange}
        />
      </div>
    </div>
  )
}

export default Register
