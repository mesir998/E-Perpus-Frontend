// 📂 src/components/admin/pages/Form/FormTambahPeminjaman.jsx
import { Loader2 } from 'lucide-react'

import { useFormTambahPeminjaman } from '../../../../hooks/useFormTambahPeminjaman'
import FormPeminjamanLayout from '../../components/peminjaman/FormPeminjamanLayout'

const FormTambahPeminjaman = () => {
  // Panggil Logic
  const {
    listMurid,
    listBuku,
    formData,
    loading,
    initLoading,
    handleChange,
    handleSubmit,
    navigate,
  } = useFormTambahPeminjaman()

  // Loading Awal
  if (initLoading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[400px]">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Tambah Peminjaman</h1>
      </div>

      {/* Render UI Form Modular */}
      <FormPeminjamanLayout
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        listMurid={listMurid}
        listBuku={listBuku}
        loading={loading}
        onCancel={() => navigate('/admin/DataPeminjaman')}
      />
    </div>
  )
}

export default FormTambahPeminjaman
