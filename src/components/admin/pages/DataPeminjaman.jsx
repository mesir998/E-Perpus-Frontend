// 📂 src/views/DataPeminjaman.jsx
import { Link } from 'react-router-dom'
import { Plus, BookOpen } from 'lucide-react'

// Import Modular Hook & Components
import { useDataPeminjaman } from '../../../hooks/useDataPeminjaman' // 👈 Import Hook Baru
import PaginationControls from '../layouts/PaginationControls'
import DetailPeminjamanModal from '../components/peminjaman/PeminjamanDetailModal'
import PeminjamanTable from '../components/peminjaman/PeminjamanTable'

export default function DataPeminjaman() {
  // Panggil Logic dari Hook
  const {
    loading,
    paginatedData,
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    totalPages,
    totalItems,
    startIndex,
    endIndex,
    handleNextPage,
    handlePrevPage,
    isModalOpen,
    setIsModalOpen,
    selectedData,
    handleDelete,
    handleEdit,
    handleShowDetail,
    peminjaman, // Buat cek total items original
  } = useDataPeminjaman()

  return (
    <div className="p-4 max-w-full">
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="flex items-center gap-2 text-xl md:text-2xl font-bold text-gray-700">
          <BookOpen size={24} className="text-blue-600" />
          Data Peminjaman
        </h1>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Cari Kode, Nama, atau Judul Buku..."
            className="border border-gray-300 p-2 rounded-md w-full sm:w-72 focus:ring-2 focus:ring-blue-500 text-sm transition"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setCurrentPage(1)
            }}
          />

          <Link
            to="/admin/DataPeminjaman/FormTambahPeminjaman"
            className="flex items-center justify-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm shadow-sm"
          >
            <Plus size={16} /> Tambah Peminjaman
          </Link>
        </div>
      </div>

      {/* --- Table Component --- */}
      <PeminjamanTable
        data={paginatedData}
        loading={loading}
        onDetail={handleShowDetail}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* --- Pagination Controls --- */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        startIndex={startIndex}
        endIndex={endIndex}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        originalTotalItems={peminjaman.length}
        isFiltered={!!search}
        dataType="data peminjaman"
      />

      {/* --- Modal Detail --- */}
      {isModalOpen && (
        <DetailPeminjamanModal
          data={selectedData}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}
