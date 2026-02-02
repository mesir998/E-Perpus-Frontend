// 📂 src/components/peminjaman/FormEditPeminjamanLayout.jsx
import { Save, Loader2, FileText } from 'lucide-react'
import { formatRp } from '../../../utils/formatters'

export default function FormEditPeminjamanLayout({
  formData,
  displayInfo,
  saving,
  handleChange,
  handleSubmit,
  onCancel,
}) {
  return (
    <div className="w-full p-4 md:p-6 bg-white rounded-lg shadow-md border border-gray-100">
      {/* Header */}
      <div className="flex items-center mb-6 border-b pb-4">
        <FileText className="text-blue-600 mr-2 w-6 h-6 md:w-7 md:h-7" />
        <h1 className="text-lg md:text-2xl font-bold text-gray-700">
          Edit Peminjaman:
          <span className="text-blue-600 ml-2 font-mono text-base md:text-xl">
            {displayInfo.kode_booking}
          </span>
        </h1>
      </div>

      {/* Grid: 1 kolom di HP, 3 kolom di Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* === KOLOM KIRI: INFO (Read Only) === */}
        <div className="lg:col-span-1 space-y-4 md:space-y-6">
          <div className="p-4 md:p-5 bg-blue-50 rounded-xl border border-blue-100">
            <h3 className="text-xs md:text-sm font-bold text-blue-800 uppercase tracking-wider mb-3 md:mb-4 border-b border-blue-200 pb-2">
              Informasi Peminjam
            </h3>

            <div className="mb-3 md:mb-4">
              <label className="text-[10px] md:text-xs text-gray-500 block mb-1 font-semibold">
                Nama Murid
              </label>
              <p className="text-gray-900 font-bold text-base md:text-lg leading-tight">
                {displayInfo.nama_murid}
              </p>
            </div>
            {/* Kode Eksemplar */}
            <div className="mt-3 md:mt-4">
              <label className="text-[10px] md:text-xs text-gray-500 block mb-1 font-semibold">
                Kode Eksemplar
              </label>
              <p className="text-blue-700 font-mono text-sm md:text-base font-bold bg-blue-100/50 px-2 py-1 rounded inline-block">
                {displayInfo.kode_eksemplar || '-'}
              </p>
            </div>

            <div>
              <label className="text-[10px] md:text-xs text-gray-500 block mb-1 font-semibold">
                Judul Buku
              </label>
              <p className="text-gray-800 font-medium text-sm md:text-base italic">
                {displayInfo.judul_buku}
              </p>
            </div>
          </div>

          {/* Info Tanggal Tetap */}
          <div className="p-4 md:p-5 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="text-xs md:text-sm font-bold text-gray-600 uppercase tracking-wider mb-3 md:mb-4 border-b border-gray-300 pb-2">
              Jadwal
            </h3>
            <div className="space-y-2 md:space-y-3">
              <div>
                <label className="text-[10px] md:text-xs text-gray-500 block">
                  Tanggal Pinjam
                </label>
                <div className="font-medium text-gray-800 text-sm md:text-base">
                  {formData.tanggal_pinjam || '-'}
                </div>
              </div>
              <div>
                <label className="text-[10px] md:text-xs text-gray-500 block">
                  Batas Kembali
                </label>
                <div className="font-medium text-red-600 text-sm md:text-base">
                  {formData.tanggal_kembali || '-'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* === KOLOM KANAN: FORM INPUT === */}
        <div className="lg:col-span-2">
          <form
            onSubmit={handleSubmit}
            className="space-y-5 md:space-y-6 bg-white"
          >
            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status Peminjaman <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="status_pinjam"
                  value={formData.status_pinjam}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none text-sm md:text-base"
                  required
                >
                  <option value="booking">Booking</option>
                  <option value="dipinjam">Dipinjam</option>
                  <option value="selesai">Selesai </option>
                  <option value="batal">Batal</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Grid Input Bawah */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {/* Tanggal Aktual */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal Aktual Kembali
                </label>
                <input
                  type="date"
                  name="tanggal_actual"
                  value={formData.tanggal_actual || ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                />
                <p className="text-[10px] md:text-xs text-gray-400 mt-1">
                  Isi jika buku sudah dikembalikan/hilang.
                </p>
              </div>

              {/* Denda */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Denda (Rp)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500 font-semibold text-sm md:text-base">
                    Rp
                  </span>
                  <input
                    type="number"
                    name="denda"
                    value={formData.denda}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full border border-gray-300 p-3 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                  />
                </div>
                <p className="text-[10px] md:text-xs text-gray-400 mt-1">
                  Hasil Terformat:{' '}
                  <span className="font-semibold text-gray-700">
                    {formatRp(formData.denda)}
                  </span>
                </p>

                {/* Helper Text Khusus Hilang */}
                {formData.status_pinjam === 'hilang' && (
                  <div className="mt-2 p-3 bg-red-50 border border-red-100 rounded-lg flex items-start gap-2">
                    <p className="text-xs text-red-700 leading-snug">
                      <b>Info:</b> Untuk status <b>Hilang</b>, jika denda diisi{' '}
                      <b>0</b>, sistem akan otomatis mengisi denda sesuai{' '}
                      <b>Harga Buku</b> (atau Rp 100.000 jika harga kosong).
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* 🔥 INPUT KETERANGAN (BARU) 🔥 */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Keterangan / Alasan Denda
              </label>
              <textarea
                name="keterangan"
                value={formData.keterangan || ''}
                onChange={handleChange}
                rows="2"
                placeholder="Contoh: Telat 5 hari, Buku Hilang, Cover Robek, dll..."
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base resize-none"
              ></textarea>
            </div>

            {/* Tombol Aksi */}
            <div className="flex flex-col-reverse md:flex-row justify-end gap-3 pt-6 border-t mt-8">
              <button
                type="button"
                onClick={onCancel}
                className="w-full md:w-auto px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium text-center"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={saving}
                className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-blue-300 flex items-center justify-center gap-2 font-medium shadow-sm"
              >
                {saving ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Save size={18} />
                )}
                {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
