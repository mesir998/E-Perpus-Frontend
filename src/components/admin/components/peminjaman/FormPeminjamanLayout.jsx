// 📂 src/components/admin/components/peminjaman/FormPeminjamanLayout.jsx
import { Save, Loader2 } from 'lucide-react'

export default function FormPeminjamanLayout({
  formData,
  handleChange,
  handleSubmit,
  listMurid,
  listBuku,
  loading,
  onCancel,
}) {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* INPUT MURID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nama Peminjam (Murid)
          </label>
          <select
            name="murid_id" // Penting untuk handleChange
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={formData.murid_id}
            onChange={handleChange}
            required
          >
            <option value="">-- Pilih Murid --</option>
            {listMurid.map((murid) => (
              <option key={murid.id} value={murid.id}>
                {murid.namaLengkap} - {murid.nis} ({murid.kelas})
              </option>
            ))}
          </select>
        </div>

        {/* INPUT BUKU */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Buku yang Dipinjam
          </label>
          <select
            name="buku_id" // Penting untuk handleChange
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={formData.buku_id}
            onChange={handleChange}
            required
          >
            <option value="">-- Pilih Buku --</option>
            {listBuku.map((buku) => (
              <option key={buku.id} value={buku.id}>
                {buku.judul} (Tersedia:{' '}
                {buku.total_eksemplar - (buku.non_tersedia_inventory || 0)})
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-400 mt-1">
            *Sistem akan otomatis memilih kode eksemplar yang tersedia.
          </p>
        </div>

        {/* INPUT TANGGAL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tanggal Pinjam
            </label>
            <input
              type="date"
              name="tanggal_pinjam" // Penting untuk handleChange
              className="w-full border border-gray-300 rounded-lg p-3"
              value={formData.tanggal_pinjam}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tanggal Kembali (Otomatis)
            </label>
            <input
              type="date"
              name="tanggal_kembali"
              className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50"
              value={formData.tanggal_kembali}
              readOnly
            />
          </div>
        </div>

        {/* TOMBOL ACTION */}
        <div className="pt-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition flex items-center gap-2 disabled:bg-blue-300"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Save size={20} />
            )}
            {loading ? 'Menyimpan...' : 'Simpan Data'}
          </button>
        </div>
      </form>
    </div>
  )
}
