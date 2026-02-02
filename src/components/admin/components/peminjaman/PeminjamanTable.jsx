import { Eye, Pencil, Trash2 } from 'lucide-react'

export default function PeminjamanTable({
  data,
  loading,
  onDetail,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="text-center py-10 text-gray-600">
        <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <div className="mt-2 text-sm">Memuat data peminjaman...</div>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg">
      <table className="min-w-full text-sm border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {/* 1. KODE BOOKING (Sembunyi di HP) */}
            <th className="border px-3 py-2 text-center whitespace-nowrap hidden md:table-cell">
              Kode Booking
            </th>

            {/* 2. NAMA MURID (Tampil Terus) */}
            <th className="border px-3 py-2 text-center whitespace-nowrap">
              Nama Peminjam
            </th>

            {/* 3. JUDUL BUKU (Sembunyi di HP) */}
            <th className="border px-3 py-2 text-center whitespace-nowrap hidden md:table-cell">
              Judul Buku
            </th>

            {/* 4. STATUS (Sembunyi di HP) */}
            <th className="border px-3 py-2 text-center whitespace-nowrap hidden md:table-cell">
              Status Pinjam
            </th>

            {/* 5. AKSI (Tampil Terus) */}
            <th className="border px-3 py-2 text-center whitespace-nowrap">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((p, i) => (
              <tr
                key={p.id}
                className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                {/* 1. KODE BOOKING (Sembunyi di HP) */}
                <td className="border px-3 py-2 hidden md:table-cell">
                  {p.kode_booking}
                </td>

                {/* 2. NAMA MURID */}
                <td className="border px-3 py-2">
                  <div className="font-medium text-gray-900">
                    {p.nama_murid ?? '-'}
                  </div>
                </td>

                {/* 3. JUDUL BUKU (Sembunyi di HP) */}
                <td className="border px-3 py-2 max-w-[220px] truncate hidden md:table-cell">
                  {p.judul ?? p.buku_judul ?? '-'}
                </td>

                {/* 4. STATUS (Sembunyi di HP) */}
                <td className="border px-3 py-2 hidden md:table-cell">
                  {p.status_pinjam}
                </td>

                {/* 5. AKSI */}
                <td className="border px-3 py-2 text-center whitespace-nowrap min-w-[120px]">
                  <div className="flex gap-1 justify-center">
                    <button
                      onClick={() => onDetail(p)}
                      className="text-gray-700 hover:bg-gray-100 border border-gray-400 p-1.5 rounded-md"
                      title="Detail"
                    >
                      <Eye size={14} />
                    </button>
                    <button
                      onClick={() => onEdit(p.id)}
                      className="text-blue-600 hover:bg-blue-50 border border-blue-600 p-1.5 rounded-md"
                      title="Edit"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => onDelete(p.id)}
                      className="text-red-600 hover:bg-red-50 border border-red-600 p-1.5 rounded-md"
                      title="Hapus"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="text-center px-4 py-6 text-gray-500 text-sm"
              >
                Tidak ada data peminjaman.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
