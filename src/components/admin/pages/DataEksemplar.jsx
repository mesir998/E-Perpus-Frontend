// 📂 src/views/DataEksemplar.jsx
import { Box } from 'lucide-react'

// Import Modular Components & Hooks
import { useDataEksemplar } from '../../../hooks/useDataEksemplar' // 👈 Hook Baru
import EksemplarTable from '../components/books/eksemplar/EksemplarTable' // 👈 Tabel Baru
import PaginationControls from '../layouts/PaginationControls'

function DataEksemplar() {
  // Panggil Logic
  const {
    paginatedEksemplar,
    loading,
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    totalItems,
    totalPages,
    startIndex,
    endIndex,
    handleNextPage,
    handlePrevPage,
    handleDelete,
    handleEdit,
    eksemplar, // untuk cek length original
  } = useDataEksemplar()

  return (
    <div className="p-4 max-w-full">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="flex items-center gap-2 text-xl md:text-2xl font-bold text-gray-700">
          <Box size={24} className="text-blue-600" /> Buku Eksemplar
        </h1>
        <input
          type="text"
          placeholder="Cari kode, judul, status..."
          className="border border-gray-300 p-2 rounded-md w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setCurrentPage(1)
          }}
        />
      </div>

      {/* Tabel Komponen */}
      <EksemplarTable
        data={paginatedEksemplar}
        loading={loading}
        startIndex={startIndex}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Pagination Controls */}
      {!loading && eksemplar.length > 0 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          startIndex={startIndex}
          endIndex={endIndex}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          originalTotalItems={eksemplar.length}
          isFiltered={!!search}
          dataType="buku eksemplar"
        />
      )}
    </div>
  )
}

export default DataEksemplar
