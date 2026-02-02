// 📂 src/components/categories/FormEditKategoriLayout.jsx
import { Save, X, Loader2, List } from 'lucide-react' // Tambah icon List biar manis

export default function FormEditKategoriLayout({
  namaKategori,
  setNamaKategori,
  handleSubmit,
  loading,
  onCancel,
}) {
  if (loading) {
    return (
      <div className="w-full p-10 flex justify-center">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    )
  }

  return (
    // 👇 UBAH DI SINI:
    // Hapus 'max-w-xl', 'mx-auto'
    // Ganti jadi 'w-full'
    <div className="w-full p-6 bg-white rounded-lg shadow-md border border-gray-100">
      {/* Header dengan garis bawah biar rapi */}
      <h1 className="text-xl md:text-2xl font-bold mb-6 text-gray-700 flex items-center gap-2 border-b pb-4">
        <List className="text-blue-600" />
        Edit Kategori
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Input Wrapper */}
        <div className="max-w-3xl">
          {' '}
          {/* Gw kasih max-w disini biar inputnya ga kepanjangan banget, tapi background tetep full */}
          <label className="block mb-2 text-sm text-gray-700 font-semibold">
            Nama Kategori
          </label>
          <input
            type="text"
            placeholder="Contoh: Buku Pelajaran, Novel, Komik..."
            value={namaKategori}
            onChange={(e) => setNamaKategori(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-gray-50 focus:bg-white"
            required
          />
          <p className="text-xs text-gray-500 mt-2">
            Pastikan nama kategori jelas dan tidak duplikat.
          </p>
        </div>

        {/* Tombol Aksi */}
        <div className="flex gap-3 pt-4 border-t mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
          >
            <X size={18} /> Batal
          </button>

          <button
            type="submit"
            disabled={!namaKategori.trim()}
            className={`flex items-center gap-2 px-5 py-2.5 text-white rounded-lg transition shadow-sm font-medium ${
              !namaKategori.trim()
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            <Save size={18} /> Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  )
}
