import { X } from 'lucide-react' //
import PropTypes from 'prop-types'

// ==============================
// 🔹 KONFIGURASI TARIF DENDA (MINGGUAN)
// ==============================
const DENDA_PER_MINGGU = 10000

// ==============================
// 🔹 Helper: Format Tanggal
// ==============================
function formatDate(dateStr) {
  if (!dateStr || dateStr === '-') return '-'
  try {
    return new Date(dateStr).toLocaleString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
  } catch {
    return dateStr
  }
}

// ==============================
// 🔹 Helper: Format Rupiah
// ==============================
function formatRp(value = 0) {
  const n = Number(value) || 0
  return 'Rp ' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

// ==============================
// 🔹 Helper: Hitung Denda Otomatis (MINGGUAN)
// ==============================
function hitungEstimasiDenda(tglKembali, status, dendaDb) {
  // 1. Prioritas: Kalau di DB sudah ada angka, pakai itu
  if (dendaDb > 0) return dendaDb

  // 2. Kalau status BUKAN dipinjam, denda 0
  if (status !== 'dipinjam') return 0

  // 3. Logic Hitung: Cek tanggal hari ini vs batas kembali
  const batas = new Date(tglKembali)
  const sekarang = new Date()

  // Kalau belum lewat waktu, aman
  if (sekarang <= batas) return 0

  // Hitung selisih waktu
  const selisihMs = sekarang - batas

  // Hitung total hari (pakai Math.ceil biar telat dikit dihitung 1 hari)
  const selisihHari = Math.ceil(selisihMs / (1000 * 60 * 60 * 24))

  // --- 🔴 LOGIC BARU: KONVERSI KE MINGGU 🔴 ---
  const mingguTerlambat = Math.ceil(selisihHari / 7)

  // Total denda dikali tarif mingguan
  return mingguTerlambat * DENDA_PER_MINGGU
}

// ==============================
// 🔹 Komponen mini untuk detail
// ==============================
function DetailItem({ label, value, className = '' }) {
  return (
    <div className={`grid grid-cols-3 gap-2 ${className}`}>
      <span className="text-sm text-gray-500 col-span-1">{label}</span>
      <span className="text-sm font-semibold text-gray-800 col-span-2 break-words">
        {value}
      </span>
    </div>
  )
}

DetailItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.node,
  className: PropTypes.string,
}

// ==========================================================
// 🔹 KOMPONEN UTAMA: MODAL DETAIL PEMINJAMAN
// ==========================================================
export default function DetailPeminjamanModal({ data, onClose }) {
  if (!data) return null

  // 1. Normalisasi Data
  const namaMurid = data.nama_murid ?? data.namaLengkap ?? '-'
  const nisMurid = data.nis ?? data.murid_nis ?? '-'
  const judulBuku = data.judul ?? data.buku_judul ?? '-'

  // Ambil status dari status_pinjam ATAU status
  const statusAktual = (data.status_pinjam || data.status || '-').toLowerCase()

  // 2. Hitung Denda Final
  const dendaFinal = hitungEstimasiDenda(
    data.tanggal_kembali,
    statusAktual,
    data.denda
  )

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg transform transition-all scale-100 max-h-[90vh] overflow-y-auto custom-scrollbar"
      >
        {/* Header */}
        <div className="flex justify-between items-center pb-3 border-b">
          <h2 className="text-xl font-bold text-gray-800">Detail Peminjaman</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1 rounded-full transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-3 pt-4">
          <DetailItem
            label="Kode Booking"
            value={data.kode_booking}
            className="text-lg"
          />

          <DetailItem
            label="Status"
            value={
              <span
                className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${
                  statusAktual === 'dipinjam'
                    ? 'bg-yellow-100 text-yellow-700'
                    : statusAktual === 'kembali' || statusAktual === 'selesai'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                }`}
              >
                {statusAktual}
              </span>
            }
          />

          <hr />
          <DetailItem label="Nama Murid" value={namaMurid} />
          <DetailItem label="NIS Murid" value={nisMurid} />
          <hr />
          <DetailItem label="Judul Buku" value={judulBuku} />
          <DetailItem
            label="Kode Eksemplar"
            value={data.kode_eksemplar || '-'}
          />
          <hr />
          <DetailItem
            label="Tanggal Pinjam"
            value={formatDate(data.tanggal_pinjam)}
          />
          <DetailItem
            label="Batas Kembali"
            value={formatDate(data.tanggal_kembali)}
          />
          <DetailItem
            label="Aktual Kembali"
            value={data.tanggal_actual ? formatDate(data.tanggal_actual) : '-'}
          />

          {/* Bagian Denda */}
          <DetailItem
            label="Denda "
            value={
              <div className="flex flex-col">
                <span
                  className={
                    dendaFinal > 0 ? 'text-red-600 font-bold' : 'text-gray-800'
                  }
                >
                  {formatRp(dendaFinal)}
                </span>
                {statusAktual === 'dipinjam' && dendaFinal > 0 && (
                  <span className="text-[10px] text-red-500 font-normal mt-1">
                    *Estimasi denda mingguan berjalan
                  </span>
                )}
              </div>
            }
          />

          {/* 🔥 UPDATE: MENAMPILKAN KETERANGAN/ALASAN DENDA 🔥 */}
          {data.keterangan && (
            <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg flex items-start gap-3">
              <div>
                <p className="text-xs text-red-600 font-bold uppercase mb-1">
                  Keterangan / Alasan Denda
                </p>
                {/* whitespace-pre-wrap biar enter/baris baru kebaca */}
                <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {data.keterangan}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

DetailPeminjamanModal.propTypes = {
  data: PropTypes.object,
  onClose: PropTypes.func.isRequired,
}
