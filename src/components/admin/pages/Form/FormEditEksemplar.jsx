// 📂 src/views/FormEditEksemplar.jsx
import { Loader2 } from 'lucide-react'
import { useFormEditEksemplar } from '../../../../hooks/useFormEditEksemplar' // 👈 Import Hook
import FormEditEksemplarLayout from '../../components/books/eksemplar/FormEditEksemplarLayout' // 👈 Import UI

const FormEditEksemplar = () => {
  // Panggil Logic
  const {
    detailEksemplar,
    statusBaru,
    setStatusBaru,
    noInventarisBaru,
    setNoInventarisBaru,
    loading,
    submitting,
    handleSubmit,
    navigate,
  } = useFormEditEksemplar()

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-200px)]">
        <div className="text-center text-gray-600">
          <Loader2 className="inline-block w-10 h-10 animate-spin text-blue-500 mb-2" />
          <div className="text-sm font-medium">Memuat detail eksemplar...</div>
        </div>
      </div>
    )
  }

  if (!detailEksemplar) {
    return (
      <div className="p-8 text-center text-red-600 font-medium">
        Gagal memuat data eksemplar.
      </div>
    )
  }

  return (
    <FormEditEksemplarLayout
      detailEksemplar={detailEksemplar}
      statusBaru={statusBaru}
      setStatusBaru={setStatusBaru}
      noInventarisBaru={noInventarisBaru}
      setNoInventarisBaru={setNoInventarisBaru}
      submitting={submitting}
      handleSubmit={handleSubmit}
      onCancel={() => navigate('/admin/DataEksemplar')}
    />
  )
}

export default FormEditEksemplar
