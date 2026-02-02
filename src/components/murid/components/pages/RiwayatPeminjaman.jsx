import { useState } from 'react'
import { Search } from 'lucide-react'

// 1. IMPORT LAYOUT (Pastikan path-nya benar)
// Naik 3 level: components/murid/components/pages -> components/Layout
import Layout from '../../../Layout'

// 2. Import Komponen Lain
import PaginationControls from '../../../admin/layouts/PaginationControls'
import DetailPeminjamanModal from '../../../admin/components/peminjaman/PeminjamanDetailModal'
import RiwayatTable from '../history/RiwayatTable'
import { useRiwayatPeminjaman } from '../../../../hooks/useRiwayatPeminjaman'

export default function RiwayatPeminjaman() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedData, setSelectedData] = useState(null)

  const {
    loading,
    search,
    setSearch,
    paginatedData,
    totalPages,
    currentPage,
    setCurrentPage,
    totalItems,
    startIndex,
    itemsPerPage,
    riwayat,
  } = useRiwayatPeminjaman()

  const handleOpenDetail = (item) => {
    setSelectedData(item)
    setIsModalOpen(true)
  }

  return (
    // 🔥 PERBAIKAN: Bungkus konten utama dengan <Layout>
    // Layout ini otomatis akan merender Sidebar/Navbar dan Footer
    <Layout>
      <div className="w-full max-w-7xl mx-auto p-4 md:p-8">
        {/* Header Content & Search */}
        <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
          <div>
            <h1 className="text-xl md:text-3xl font-bold text-gray-900 tracking-tight">
              Riwayat Peminjaman
            </h1>
            <p className="text-gray-500 mt-1 md:mt-2 text-xs md:text-base max-w-2xl">
              Daftar buku yang sedang atau pernah kamu pinjam.
            </p>
          </div>

          <div className="relative w-full md:w-80 group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 md:h-5 md:w-5 text-gray-400 group-focus-within:text-teal-500 transition" />
            </div>
            <input
              type="text"
              className="block w-full pl-9 md:pl-10 pr-4 py-2 md:py-2.5 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition shadow-sm text-xs md:text-sm"
              placeholder="Cari judul..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* TABLE COMPONENT */}
        <RiwayatTable
          data={paginatedData}
          loading={loading}
          search={search}
          onDetailClick={handleOpenDetail}
          onClearSearch={() => setSearch('')}
        />

        {/* PAGINATION */}
        {!loading && (
          <div className="mt-6">
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              startIndex={startIndex}
              endIndex={startIndex + itemsPerPage}
              handleNextPage={() =>
                currentPage < totalPages && setCurrentPage((p) => p + 1)
              }
              handlePrevPage={() =>
                currentPage > 1 && setCurrentPage((p) => p - 1)
              }
              originalTotalItems={riwayat.length}
              isFiltered={!!search}
              dataType="riwayat"
            />
          </div>
        )}
      </div>

      {/* MODAL (Tetap di dalam Layout atau di luar tidak masalah, tapi di dalam lebih aman buat styling z-index) */}
      {isModalOpen && (
        <DetailPeminjamanModal
          data={selectedData}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </Layout>
  )
}
