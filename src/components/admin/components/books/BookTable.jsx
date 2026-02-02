import { Loader2, Database } from 'lucide-react'
import BookTableRow from './BookTableRow'

export default function BookTable({
  data,
  loading,
  startIndex,
  onEdit,
  onDelete,
  onDetailStok,
  onShowDetail,
}) {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg border border-gray-200">
      <table className="min-w-full text-left border-collapse">
        <thead className="bg-gray-100 text-gray-700 uppercase font-semibold text-xs sm:text-sm">
          <tr>
            {/* 1. COVER: Lebar fix */}
            <th className="border border-gray-300 px-4 py-4 text-center w-[150px] min-w-[150px]">
              Cover
            </th>

            {/* 2. JUDUL BUKU: Hilang di HP (hidden), Muncul di Desktop (md:table-cell) */}
            <th className="hidden md:table-cell border border-gray-300 px-4 py-4 w-full min-w-[250px] text-center">
              Judul Buku
            </th>

            {/* 3. AKSI: Tetap muncul */}
            <th className="border border-gray-300 px-4 py-4 text-center w-[1%] whitespace-nowrap">
              Aksi
            </th>
          </tr>
        </thead>

        <tbody className="text-xs sm:text-sm text-gray-700">
          {loading ? (
            <tr>
              {/* colspan disesuaikan jadi 2 di HP, 3 di Desktop */}
              <td colSpan={3} className="text-center py-10">
                <div className="flex flex-col items-center justify-center text-gray-500">
                  <Loader2 className="animate-spin h-8 w-8 mb-2 text-blue-500" />
                  <span>Memuat data buku...</span>
                </div>
              </td>
            </tr>
          ) : data.length > 0 ? (
            data.map((b, i) => (
              <BookTableRow
                key={b.id}
                book={b}
                index={startIndex + i}
                onEdit={onEdit}
                onDelete={onDelete}
                onDetailStok={onDetailStok}
                onShowDetail={onShowDetail}
              />
            ))
          ) : (
            <tr>
              <td
                colSpan={3}
                className="text-center px-4 py-10 text-gray-500 italic"
              >
                <div className="flex flex-col items-center gap-2">
                  <Database className="h-8 w-8 text-gray-300" />
                  <span>Tidak ada data buku ditemukan.</span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
