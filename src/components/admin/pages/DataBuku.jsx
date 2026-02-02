// 📂 src/views/DataBuku.jsx
import { Link } from 'react-router-dom'
import { BookOpen, Plus } from 'lucide-react'

// Import Modular Components & Hooks
import { useDataBuku } from '../../../hooks/useDataBuku'
import BookTable from '../components/books/BookTable'
import PaginationControls from '../layouts/PaginationControls'
import BookDetailModal from '../components/books/BookDetailModal'

export default function DataBuku() {
  const {
    paginatedBuku,
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
    handleDetailStok,
    showDetailModal,
    selectedBookDetail,
    handleShowDetail,
    handleCloseDetailModal,
    buku,
  } = useDataBuku()

  return (
    // UPDATED: Padding container dikit di mobile (p-3), lega di desktop (sm:p-4)
    <div className="p-3 sm:p-4 max-w-full">
      {/* HEADER & SEARCH */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4 mb-4 md:mb-6">
        {/* JUDUL HALAMAN */}
        <h1 className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl font-bold text-gray-700">
          {/* Icon ikut mengecil di mobile (w-5 h-5) */}
          <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
          Data Buku
        </h1>

        {/* WRAPPER SEARCH & TOMBOL */}
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          {/* INPUT SEARCH */}
          <input
            type="text"
            placeholder="Cari judul, ISBN, penulis..."
            // UPDATED: text-xs di mobile biar muat banyak, text-sm di desktop
            className="border border-gray-300 px-3 py-2 rounded-md w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setCurrentPage(1)
            }}
          />

          {/* TOMBOL TAMBAH BUKU */}
          <Link
            to="/admin/DataBuku/FormTambahBuku"
            // UPDATED: text-xs dan padding disesuaikan biar gak bongsor di HP
            className="flex items-center justify-center gap-1 bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-md hover:bg-blue-700 transition text-xs sm:text-sm font-medium"
          >
            {/* Icon plus juga disesuaikan ukurannya */}
            <Plus size={16} className="w-4 h-4 sm:w-5 sm:h-5" />
            Tambah Buku
          </Link>
        </div>
      </div>

      {/* COMPONENT TABLE */}
      <BookTable
        data={paginatedBuku}
        loading={loading}
        startIndex={startIndex}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDetailStok={handleDetailStok}
        onShowDetail={handleShowDetail}
      />

      {/* COMPONENT PAGINATION */}
      {!loading && buku.length > 0 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          startIndex={startIndex}
          endIndex={endIndex}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          originalTotalItems={buku.length}
          isFiltered={!!search}
          dataType="data buku"
        />
      )}

      {/* COMPONENT MODAL DETAIL */}
      {showDetailModal && selectedBookDetail && (
        <BookDetailModal
          book={selectedBookDetail}
          onClose={handleCloseDetailModal}
        />
      )}
    </div>
  )
}
