import { Layers, Plus } from 'lucide-react'

// Terima props tambahan: searchTerm & onSearchChange
export default function KategoriHeader({ searchTerm, onSearchChange, onAdd }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
      {/* Judul Halaman */}
      <h1 className="text-xl font-bold flex items-center gap-2">
        <Layers size={22} className="text-blue-600" />
        Data Kategori
      </h1>

      {/* Bagian Kanan: Search Bar & Tombol Tambah */}
      <div className="flex gap-2 w-full md:w-auto">
        <input
          type="text"
          placeholder="Cari kategori..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="border px-2 py-1 text-sm rounded w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={onAdd}
          className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 text-sm rounded hover:bg-blue-700 whitespace-nowrap"
        >
          <Plus size={16} /> Tambah Kategori
        </button>
      </div>
    </div>
  )
}
