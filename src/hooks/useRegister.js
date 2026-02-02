// 📂 src/hooks/useRegister.js
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Swal from 'sweetalert2'
import api from '../components/utils/api'
import { registerSchema } from '../components/validations/registerSchema' // Pastikan path ini benar

export const useRegister = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [selectedKelas, setSelectedKelas] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  })

  // Handler khusus untuk perubahan dropdown Kelas
  const handleKelasChange = (e) => {
    const val = e.target.value
    setSelectedKelas(val)

    // Logic bisnis: Kalau kelas X, reset jurusan jadi kosong
    if (val === 'X') {
      setValue('jurusan', '')
    }
  }

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await api.post('/api/auth/register/murid', data)

      Swal.fire({
        icon: 'success',
        title: 'Registrasi berhasil!',
        text: 'Silakan login untuk melanjutkan.',
        confirmButtonColor: '#3085d6',
      }).then(() => {
        navigate('/login')
      })
    } catch (err) {
      const message = err.response?.data?.message || 'Registrasi gagal.'
      Swal.fire({
        icon: 'error',
        title: 'Registrasi gagal!',
        text: message,
      })
    } finally {
      setLoading(false)
    }
  }

  return {
    register,
    handleSubmit,
    errors,
    loading,
    onSubmit,
    selectedKelas,
    handleKelasChange, // Kita lempar ini ke UI
  }
}
