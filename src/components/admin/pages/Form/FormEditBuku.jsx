// 📂 src/components/admin/pages/Form/FormEditBuku.jsx
import { useFormEditBuku } from '../../../../hooks/useFormEditBuku'
import FormEditBukuLayout from '../../components/books/FormEditBukuLayout'

const FormEditBuku = () => {
  // Panggil Logic dari Hook
  const {
    form,
    loading,
    kategoriList,
    coverPreview,
    coverName,
    imgError,
    setImgError,
    handleChange,
    handleFileChange,
    handleSubmit,
    navigate,
  } = useFormEditBuku()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <FormEditBukuLayout
      form={form}
      handleChange={handleChange}
      handleFileChange={handleFileChange}
      handleSubmit={handleSubmit}
      kategoriList={kategoriList}
      coverPreview={coverPreview}
      coverName={coverName}
      imgError={imgError}
      setImgError={setImgError}
      onCancel={() => navigate('/admin/DataBuku')}
    />
  )
}

export default FormEditBuku
