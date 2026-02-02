// 📂 src/views/FormEditKategori.jsx
import { useFormEditKategori } from '../../../../hooks/useFormEditKategori'
import FormEditKategoriLayout from '../../components/categories/FormEditKategoriLayout'

const FormEditKategori = () => {
  // Use the custom hook
  const { namaKategori, setNamaKategori, handleSubmit, loading, navigate } =
    useFormEditKategori()

  return (
    <div className="p-6 w-full">
      <FormEditKategoriLayout
        namaKategori={namaKategori}
        setNamaKategori={setNamaKategori}
        handleSubmit={handleSubmit}
        loading={loading}
        onCancel={() => navigate('/admin/DataKategori')}
      />
    </div>
  )
}

export default FormEditKategori
