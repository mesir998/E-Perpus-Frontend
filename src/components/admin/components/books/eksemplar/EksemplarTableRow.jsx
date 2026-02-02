import { Pencil, Trash2 } from 'lucide-react'

// =======================================
// 🔹 Helper: Badge Warna Berdasarkan Status
// =======================================
const getStatusBadge = (status) => {
  switch (status) {
    case 'tersedia':
      return 'bg-green-100 text-green-800'
    case 'dipinjam':
      return 'bg-yellow-100 text-yellow-800'
    case 'rusak':
      return 'bg-red-100 text-red-800'
    case 'hilang':
      return 'bg-gray-200 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

// =======================================
// 🔹 Komponen: Baris Tabel Eksemplar
// =======================================
const EksemplarTableRow = ({ eksemplar, index, onEditStatus, onDelete }) => {
  return (
    <tr
      key={eksemplar.id}
      className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
    >
      {/* Kode Eksemplar */}
      <td className="border px-3 py-2 font-semibold text-blue-600">
        {eksemplar.kode_eksemplar}
      </td>

      {/* Judul Buku */}
      <td className="border px-3 py-2 max-w-[200px] truncate">
        {eksemplar.judul_buku || 'Judul Tidak Diketahui'}
      </td>

      {/* Nomor Inventaris */}
      <td className="border px-3 py-2">
        {eksemplar.no_inventaris ? (
          eksemplar.no_inventaris
        ) : (
          <span className="text-gray-400 italic">Belum Ada</span>
        )}
      </td>

      {/* Status Eksemplar */}
      <td className="border px-3 py-2">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(
            eksemplar.status
          )}`}
        >
          {eksemplar.status.toUpperCase()}
        </span>
      </td>

      {/* 👇 BAGIAN TANGGAL (VERSI SAKTI: BISA BACA updated_at ATAU updatedAt) */}
      <td className="border px-3 py-2 text-xs whitespace-nowrap">
        {(() => {
          // Cek semua kemungkinan nama variabel (snake_case vs camelCase)
          const rawDate =
            eksemplar.updated_at ||
            eksemplar.updatedAt ||
            eksemplar.created_at ||
            eksemplar.createdAt

          // Cek validitas tanggal
          if (rawDate && !isNaN(Date.parse(rawDate))) {
            return new Date(rawDate).toLocaleString('id-ID', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })
          }
          return '-'
        })()}
      </td>

      {/* Aksi */}
      <td className="border px-3 py-2 text-center min-w-[130px] whitespace-nowrap">
        <div className="flex gap-1 justify-center">
          {/* Tombol Edit */}
          <button
            onClick={() => onEditStatus(eksemplar.id)}
            className="flex items-center gap-1 text-blue-600 hover:bg-blue-50 border border-blue-600 px-2 py-1 rounded-md transition text-xs"
            title="Ubah Status Inventaris & Tambah No. Inventaris"
          >
            <Pencil size={12} /> Edit Status
          </button>

          {/* Tombol Hapus */}
          <button
            onClick={() => onDelete(eksemplar.id)}
            className="flex items-center gap-1 text-red-600 hover:bg-red-50 border border-red-600 px-2 py-1 rounded-md transition text-xs"
            title="Hapus Eksemplar"
          >
            <Trash2 size={12} /> Hapus
          </button>
        </div>
      </td>
    </tr>
  )
}

export default EksemplarTableRow
