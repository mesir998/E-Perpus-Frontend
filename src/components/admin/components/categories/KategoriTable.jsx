import { Pencil, Trash2, Loader2 } from 'lucide-react'

const KategoriTable = ({ loading, data, startIndex, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      {loading ? (
        <div className="text-center py-10 text-gray-500 flex flex-col items-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-2" />
          <p>Memuat data...</p>
        </div>
      ) : (
        <table className="w-full border-collapse text-sm text-left">
          {/* HEADER */}
          <thead className="bg-gray-200 text-gray-700 uppercase font-bold">
            <tr>
              {/* 👇 Tambahin 'border border-gray-300' di setiap <th> */}
              <th className="border border-gray-300 p-2 w-16 text-center">
                No
              </th>
              <th className="border border-gray-300 p-2">Nama Kategori</th>
              <th className="border border-gray-300 p-2 text-center w-[150px]">
                Aksi
              </th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="border border-gray-300 text-center p-4 text-gray-500 italic"
                >
                  Tidak ada data kategori ditemukan.
                </td>
              </tr>
            ) : (
              data.map((item, i) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  {/* 👇 Tambahin 'border border-gray-300' juga di setiap <td> biar garisnya nyambung ke bawah */}
                  <td className="border border-gray-300 p-2 text-center text-gray-500">
                    {startIndex + i + 1}
                  </td>
                  <td className="border border-gray-300 p-2 font-medium text-gray-800">
                    {item.nama_kategori}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => onEdit(item.id)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => onDelete(item.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Hapus"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
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

export default KategoriTable
