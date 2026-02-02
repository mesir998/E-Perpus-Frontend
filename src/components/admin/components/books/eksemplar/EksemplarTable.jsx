// 📂 src/components/books/eksemplar/EksemplarTable.jsx
import { Loader2 } from 'lucide-react'
import EksemplarTableRow from './EksemplarTableRow' // Pastikan path relatif benar

export default function EksemplarTable({
  data,
  loading,
  startIndex,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white shadow rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border-collapse text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase font-semibold">
            <tr>
              {[
                'Kode Eksemplar',
                'Judul Buku',
                'No. Inventaris',
                'Status',
                'Terakhir Update',
                'Aksi',
              ].map((col, idx) => (
                <th
                  key={idx}
                  className="border border-gray-300 px-3 py-2 whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center p-8">
                  <Loader2 className="animate-spin inline mr-2" />
                  Memuat data...
                </td>
              </tr>
            ) : data.length > 0 ? (
              data.map((e, i) => (
                <EksemplarTableRow
                  key={e.id}
                  eksemplar={e}
                  index={startIndex + i}
                  onEditStatus={onEdit}
                  onDelete={onDelete}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="text-center px-4 py-8 text-gray-500 italic"
                >
                  Tidak ada data eksemplar ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
