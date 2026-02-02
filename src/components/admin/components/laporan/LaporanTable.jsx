import { Eye, Loader2 } from 'lucide-react'

export default function LaporanTable({
  loading,
  data,
  onViewDetail,
  getStatusBadge,
}) {
  return (
    <div className="overflow-x-auto">
      {loading ? (
        <div className="text-center py-10 text-gray-500 flex flex-col items-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-2" />
          <p>Memuat data...</p>
        </div>
      ) : (
        <table className="w-full border-collapse text-sm text-left">
          {/* 👇 HEADER */}
          <thead className="bg-gray-200 text-gray-700 uppercase font-bold">
            <tr>
              {/* Kolom KODE: Sembunyi di HP */}
              <th className="border border-gray-300 p-2 hidden md:table-cell">
                Kode
              </th>

              {/* Kolom PEMINJAM: Selalu Muncul */}
              <th className="border border-gray-300 p-2">Nama Peminjam</th>

              {/* Kolom BUKU: Sembunyi di HP */}
              <th className="border border-gray-300 p-2 hidden lg:table-cell">
                Buku
              </th>

              {/* Kolom TGL: Sembunyi di HP */}
              <th className="border border-gray-300 p-2 hidden lg:table-cell">
                Tgl Pinjam
              </th>

              {/* Kolom STATUS: Sembunyi di HP */}
              <th className="border border-gray-300 p-2 text-center hidden md:table-cell">
                Status
              </th>

              {/* Kolom AKSI: Selalu Muncul */}
              <th className="border border-gray-300 p-2 text-center">Aksi</th>
            </tr>
          </thead>

          {/* 👇 BODY */}
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan="7" // Jangan lupa update colspan jadi 7
                  className="border border-gray-300 text-center p-4 text-gray-500 italic"
                >
                  Data tidak ditemukan.
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id} className="hover:bg-blue-50 transition">
                  {/* DATA KODE */}
                  <td className="border border-gray-300 p-2 font-medium hidden md:table-cell">
                    {item.kode_booking}
                  </td>

                  {/* DATA PEMINJAM */}
                  <td className="border border-gray-300 p-2">
                    {item.nama_murid}
                  </td>

                  {/* DATA BUKU */}
                  <td className="border border-gray-300 p-2 hidden lg:table-cell">
                    <span className="line-clamp-1" title={item.judul}>
                      {item.judul}
                    </span>
                  </td>

                  {/* DATA TGL */}
                  <td className="border border-gray-300 p-2 hidden lg:table-cell">
                    {new Date(item.tanggal_pinjam).toLocaleDateString('id-ID')}
                  </td>

                  {/* DATA STATUS */}
                  <td className="border border-gray-300 p-2 text-center hidden md:table-cell">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${getStatusBadge(
                        item.status_pinjam
                      )}`}
                    >
                      {item.status_pinjam}
                    </span>
                  </td>

                  {/* DATA AKSI */}
                  <td className="border border-gray-300 p-2 text-center">
                    <button
                      onClick={() => onViewDetail(item)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Lihat Detail"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  )
}
