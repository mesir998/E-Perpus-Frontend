// 📂 src/views/FormEditPeminjaman.jsx
import { Loader2 } from 'lucide-react'
import { useFormEditPeminjaman } from '../../../../hooks/useFormEditPeminjaman' // 👈 Import Hook
import FormEditPeminjamanLayout from '../../components/peminjaman/FormEditPeminjamanLayout' // 👈 Import UI

const FormEditPeminjaman = () => {
  // Panggil Logic
  const {
    formData,
    displayInfo,
    loading,
    saving,
    handleChange,
    handleSubmit,
    navigate,
  } = useFormEditPeminjaman()

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-200px)]">
        <div className="text-center text-gray-600">
          <Loader2 className="inline-block w-10 h-10 animate-spin text-blue-500" />
          <div className="mt-2 text-sm">Memuat data...</div>
        </div>
      </div>
    )
  }

  return (
    <FormEditPeminjamanLayout
      formData={formData}
      displayInfo={displayInfo}
      saving={saving}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      onCancel={() => navigate('/admin/DataPeminjaman')}
    />
  )
}

export default FormEditPeminjaman
