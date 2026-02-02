import {
  Save,
  X,
  Upload,
  BookOpen,
  Layers,
  FileText,
  DollarSign,
} from 'lucide-react'
import InputField from './InputField'
// Pastikan path import ini bener sesuai struktur folder lu
import { formatRupiah } from '../../../utils/formatRupiah'

export default function FormEditBukuLayout({
  form,
  handleChange,
  handleFileChange,
  handleSubmit,
  kategoriList,
  coverPreview,
  coverName,
  imgError,
  setImgError,
  onCancel,
}) {
  // Logic Word Count
  const wordCount = form.deskripsi
    ? form.deskripsi.trim().split(/\s+/).filter(Boolean).length
    : 0
  const isOverLimit = wordCount > 300

  return (
    <div className="container mx-auto px-4 py-8 bg-white shadow-lg rounded-md border border-gray-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4 border-b pb-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-700 flex items-center gap-2">
          <BookOpen className="text-blue-600" /> Edit Data Buku
        </h2>

        {/* Tombol Desktop */}
        <div className="hidden md:flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition flex items-center gap-2"
          >
            <X size={18} /> Batal
          </button>

          <button
            type="submit"
            form="formEditBuku"
            disabled={isOverLimit}
            className={`px-4 py-2 text-white rounded transition flex items-center gap-2 shadow-sm ${
              isOverLimit
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            <Save size={18} /> Simpan Perubahan
          </button>
        </div>
      </div>

      {/* Form Area */}
      <form
        id="formEditBuku"
        onSubmit={handleSubmit}
        className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* BAGIAN KIRI: Input Data */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Judul Buku"
            name="judul"
            value={form.judul}
            handleChange={handleChange}
            placeholder="Misal: Dasar Pemrograman Web"
          />
          <InputField
            label="ISBN"
            name="isbn"
            value={form.isbn}
            handleChange={handleChange}
            placeholder="Misal: 978-602-1234-567"
          />
          <InputField
            label="Penulis"
            name="penulis"
            value={form.penulis}
            handleChange={handleChange}
            placeholder="Misal: Dian Pratama"
          />
          <InputField
            label="Penerbit"
            name="penerbit"
            value={form.penerbit}
            handleChange={handleChange}
            placeholder="Misal: Informatika Bandung"
          />
          <InputField
            label="Tahun Terbit"
            name="tahun_terbit"
            type="number"
            value={form.tahun_terbit}
            handleChange={handleChange}
            placeholder="Misal: 2023"
          />

          {/* 🔥 INI INPUT HARGA YANG BARU (Gw selipin di sini) 🔥 */}
          <div className="w-full">
            <InputField
              label="Harga Buku Satuan"
              name="harga"
              type="number"
              value={form.harga}
              handleChange={handleChange}
              placeholder="Kosongkan jika tidak ada"
            />
          </div>

          {/* Select Kategori */}
          <div className="w-full md:col-span-2">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Kategori
            </label>
            <select
              name="kategori_id"
              value={form.kategori_id}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">Pilih kategori</option>
              {kategoriList.map((kategori) => (
                <option key={kategori.id} value={kategori.id}>
                  {kategori.nama_kategori}
                </option>
              ))}
            </select>
          </div>

          {/* TEXTAREA DESKRIPSI */}
          <div className="md:col-span-2">
            <label className="flex items-center gap-2 mb-1 text-sm font-medium text-gray-700">
              <FileText size={16} className="text-blue-500" /> Deskripsi /
              Sinopsis <span className="text-red-500">*</span>
            </label>
            <textarea
              name="deskripsi"
              value={form.deskripsi || ''}
              onChange={handleChange}
              required
              placeholder="Update sinopsis buku untuk meningkatkan akurasi rekomendasi..."
              className={`w-full border p-3 rounded-md h-32 resize-none focus:outline-none focus:ring-2 ${
                isOverLimit
                  ? 'border-red-500 focus:ring-red-500 bg-red-50'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
            ></textarea>

            <div className="flex justify-between mt-1 px-1">
              <span className="text-[10px] text-gray-400 italic">
                *Deskripsi digunakan untuk fitur rekomendasi (CBF).
              </span>
              <span
                className={`text-xs font-medium ${isOverLimit ? 'text-red-600 font-bold' : 'text-gray-500'}`}
              >
                {wordCount} / 300 Kata
              </span>
            </div>
          </div>

          {/* Section Manajemen Stok */}
          <div className="md:col-span-2 mt-4 pt-4 border-t border-dashed border-gray-300">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">
              <Layers size={20} className="text-orange-500" /> Manajemen Stok
            </h3>
          </div>
          <InputField
            label="Total Stok (Eksemplar)"
            name="total_eksemplar"
            type="number"
            min="0"
            value={form.total_eksemplar}
            handleChange={handleChange}
            note="Jumlah total seluruh buku fisik yang dimiliki."
          />
        </div>

        {/* BAGIAN KANAN: Upload Cover */}
        <div className="lg:col-span-1">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Cover Buku
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition relative">
            {coverPreview && !imgError ? (
              <div className="relative group w-full flex justify-center mb-4">
                <img
                  src={coverPreview}
                  alt="Cover Preview"
                  className="w-40 h-56 object-cover rounded-md shadow-md"
                  onError={() => setImgError(true)}
                />
                <div
                  className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition rounded-md w-40 h-56 mx-auto cursor-pointer"
                  onClick={() => document.getElementById('fileInput').click()}
                >
                  <span className="text-white text-sm font-medium flex items-center gap-1">
                    <Upload size={16} /> Ganti
                  </span>
                </div>
              </div>
            ) : (
              <div className="w-40 h-56 bg-gray-200 rounded-md flex flex-col items-center justify-center text-gray-400 mb-4">
                <BookOpen size={48} className="opacity-50 mb-2" />
                <span className="text-xs">Tidak ada cover</span>
              </div>
            )}

            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            <label
              htmlFor="fileInput"
              className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition w-full justify-center"
            >
              <Upload className="w-4 h-4 text-blue-600" />{' '}
              {coverName ? 'Ganti File' : 'Pilih File Cover'}
            </label>
          </div>
        </div>

        {/* Tombol Mobile */}
        <div className="col-span-full flex flex-col md:hidden gap-3 pt-4 mt-4 border-t">
          <button
            type="submit"
            disabled={isOverLimit}
            className={`w-full px-4 py-3 text-white rounded-lg transition font-medium shadow-md flex justify-center items-center gap-2 ${
              isOverLimit ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            <Save size={18} /> Simpan Perubahan
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium flex justify-center items-center gap-2"
          >
            <X size={18} /> Batal
          </button>
        </div>
      </form>
    </div>
  )
}
