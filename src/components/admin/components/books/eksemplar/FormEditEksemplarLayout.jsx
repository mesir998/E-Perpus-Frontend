// 📂 src/components/books/eksemplar/FormEditEksemplarLayout.jsx
import { Pencil, Save, Loader2, X } from 'lucide-react'

const statusOptions = ['tersedia', 'dipinjam', 'booking', 'rusak', 'hilang']

export default function FormEditEksemplarLayout({
  detailEksemplar,
  statusBaru,
  setStatusBaru,
  noInventarisBaru,
  setNoInventarisBaru,
  submitting,
  handleSubmit,
  onCancel,
}) {
  // Helper: Cek Judul Buku
  const getJudulBuku = (data) => {
    if (!data) return 'N/A'
    if (data.judul_buku) return data.judul_buku
    if (data.buku && data.buku.judul) return data.buku.judul
    if (data.judul) return data.judul
    return 'N/A'
  }

  return (
    // 👇 UBAH DI SINI:
    // Gunakan 'w-full' dan HAPUS semua 'max-w-...' biar Full Screen di Desktop
    <div className="w-full bg-white shadow-md rounded-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 md:px-8 md:py-6 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
          <Pencil className="w-4 h-4 md:w-5 md:h-5" />
        </div>
        <h2 className="text-lg md:text-xl font-bold text-gray-800">
          Edit Detail Eksemplar
        </h2>
      </div>

      <div className="p-5 md:p-8">
        {/* Grid Layout: 
            - Mobile: 1 Kolom (Numpuk)
            - Desktop: 3 Kolom (Kiri Info 1 bagian, Kanan Form 2 bagian) 
        */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* === KOLOM KIRI: INFO BUKU === */}
          <div className="lg:col-span-1">
            <div className="p-4 md:p-6 bg-blue-50/80 rounded-xl border border-blue-100 sticky top-6">
              <h3 className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-4 border-b border-blue-200 pb-2">
                Informasi Buku
              </h3>

              <div className="mb-4">
                <label className="text-[10px] md:text-xs text-gray-500 block mb-1 font-semibold uppercase">
                  Judul Buku
                </label>
                <p className="text-gray-900 font-bold text-sm md:text-lg leading-snug">
                  {getJudulBuku(detailEksemplar)}
                </p>
              </div>

              <div>
                <label className="text-[10px] md:text-xs text-gray-500 block mb-1 font-semibold uppercase">
                  Kode Eksemplar
                </label>
                <span className="font-mono font-bold text-blue-700 bg-white px-3 py-1.5 rounded border border-blue-200 inline-block text-xs md:text-sm">
                  {detailEksemplar.kode_eksemplar}
                </span>
              </div>
            </div>
          </div>

          {/* === KOLOM KANAN: FORM INPUT === */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Input No Inventaris */}
              <div>
                <label
                  htmlFor="noInventaris"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Nomor Inventaris
                  <span className="text-gray-400 font-normal text-xs ml-1">
                    (Opsional)
                  </span>
                </label>
                <input
                  id="noInventaris"
                  type="text"
                  placeholder="Misal: INV-2025-001"
                  value={noInventarisBaru}
                  onChange={(e) => setNoInventarisBaru(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white text-sm md:text-base text-gray-800 placeholder-gray-400"
                />
                {detailEksemplar.no_inventaris && (
                  <p className="text-xs text-gray-500 mt-2 ml-1">
                    Saat ini:{' '}
                    <span className="font-medium text-gray-700">
                      {detailEksemplar.no_inventaris}
                    </span>
                  </p>
                )}
              </div>

              {/* Grid Status: Mobile Stack (1 col), Desktop Sebelahan (2 col) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Status Saat Ini */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Status Saat Ini
                  </label>
                  <div
                    className={`w-full p-3 border rounded-lg font-bold text-center uppercase tracking-wide text-xs md:text-sm ${
                      detailEksemplar.status === 'tersedia'
                        ? 'text-green-700 border-green-200 bg-green-50'
                        : 'text-red-700 border-red-200 bg-red-50'
                    }`}
                  >
                    {detailEksemplar.status}
                  </div>
                </div>

                {/* Ubah Status */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Ubah Status Menjadi
                  </label>
                  <div className="relative">
                    <select
                      value={statusBaru}
                      onChange={(e) => setStatusBaru(e.target.value)}
                      required
                      className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none text-sm md:text-base cursor-pointer hover:border-blue-400 transition text-gray-800"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status.toUpperCase()}
                        </option>
                      ))}
                    </select>
                    {/* Panah Dropdown */}
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* === TOMBOL AKSI === */}
              <div className="pt-8 mt-8 border-t border-gray-100">
                {/* Mobile: Grid 2 Kolom (Sebelahan) 
                   Desktop: Flex Row (Kanan)
                */}
                <div className="grid grid-cols-2 gap-3 md:flex md:justify-end md:gap-4">
                  {/* Tombol Batal */}
                  <button
                    type="button"
                    onClick={onCancel}
                    disabled={submitting}
                    className="w-full md:w-auto px-5 py-2.5 rounded-lg border border-gray-300 text-gray-600 bg-white hover:bg-gray-50 hover:text-gray-900 transition font-medium text-sm flex items-center justify-center gap-2"
                  >
                    <X size={18} className="md:hidden" />
                    <span>Batal</span>
                  </button>

                  {/* Tombol Simpan */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full md:w-auto px-6 py-2.5 rounded-lg text-white font-medium shadow-sm transition flex items-center justify-center gap-2 text-sm ${
                      submitting
                        ? 'bg-blue-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 hover:shadow-md active:scale-95'
                    }`}
                  >
                    {submitting ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <Save size={18} />
                    )}
                    <span className="md:hidden">Simpan</span>
                    <span className="hidden md:inline">Simpan Perubahan</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
