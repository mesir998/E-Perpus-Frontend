import { useState } from 'react'
import { Users, Plus } from 'lucide-react'
import PaginationControls from '../layouts/PaginationControls'
import useDataMurid from '../../../hooks/useDataMurid'
import MuridTableHeader from '../components/murid/MuridTableHeader'
import MuridTableRow from '../components/murid/MuridTableRow'
import MuridDetailModal from '../components/murid/MuridDetailModal'

const DataMurid = () => {
  const {
    muridList,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    totalPages,
    totalItems,
    startIndex,
    endIndex,
    paginatedMurid,
    handleDelete,
    handleEdit,
    handleAdd,
    handlePrevPage,
    handleNextPage,
    loading,
  } = useDataMurid()

  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [selectedMurid, setSelectedMurid] = useState(null)

  const onDetailClick = (murid) => {
    setSelectedMurid(murid)
    setIsDetailOpen(true)
  }

  const closeDetail = () => {
    setIsDetailOpen(false)
    setSelectedMurid(null)
  }

  return (
    <div className="p-4">
      {/* ✅ HEADER & SEARCH RESPONSIVE 
        - Mobile: Disusun ke bawah (flex-col)
        - Desktop: Sebelahan (md:flex-row)
      */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        {/* JUDUL */}
        <h1 className="text-lg md:text-xl font-bold flex items-center gap-2 text-gray-800">
          <Users size={20} className="md:w-6 md:h-6" /> Data Murid
        </h1>

        {/* INPUT & TOMBOL WRAPPER */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Input Cari */}
          <input
            type="text"
            placeholder="Cari nama murid..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            // Mobile: w-full (lebar full), text-sm, padding agak gedean dikit biar enak tap
            // Desktop: w-64 (lebar fix)
            className="border border-gray-300 px-3 py-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64 transition shadow-sm"
          />

          {/* Tombol Tambah */}
          <button
            onClick={handleAdd}
            // Mobile: w-full (lebar full) & justify-center (tengah)
            // Desktop: w-auto
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-blue-700 transition w-full md:w-auto shadow-sm active:scale-95"
          >
            <Plus size={18} /> Tambah Murid
          </button>
        </div>
      </div>

      {/* Tabel */}
      <div className="overflow-x-auto shadow-md rounded-lg bg-white border border-gray-200">
        <table className="w-full border-collapse text-sm text-left border border-gray-200">
          <MuridTableHeader />
          <tbody>
            {loading ? (
              // SKELETON LOADING
              [...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse bg-white border-b">
                  <td className="p-3">
                    <div className="h-8 w-8 bg-gray-200 rounded-full mx-auto"></div>
                  </td>
                  <td className="p-3">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </td>
                  <td className="p-3 hidden md:table-cell">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </td>
                  <td className="p-3 hidden md:table-cell">
                    <div className="h-4 bg-gray-200 rounded w-10"></div>
                  </td>
                  <td className="p-3 hidden md:table-cell">
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </td>
                  <td className="p-3 hidden md:table-cell">
                    <div className="h-6 bg-gray-200 rounded w-16 mx-auto"></div>
                  </td>
                  <td className="p-3">
                    <div className="h-6 w-16 bg-gray-200 rounded mx-auto"></div>
                  </td>
                </tr>
              ))
            ) : paginatedMurid.length > 0 ? (
              paginatedMurid.map((murid) => (
                <MuridTableRow
                  key={murid.id}
                  murid={murid}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onDetail={onDetailClick}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="border border-gray-300 text-center p-8 text-gray-500 italic"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Users size={32} className="text-gray-300" />
                    <span>Tidak ada data murid ditemukan.</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!loading && muridList.length > 0 && (
        <div className="mt-4">
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            startIndex={startIndex}
            endIndex={endIndex}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
            originalTotalItems={muridList.length}
            isFiltered={!!searchTerm}
            dataType="murid"
          />
        </div>
      )}

      {/* Modal Detail */}
      <MuridDetailModal
        isOpen={isDetailOpen}
        onClose={closeDetail}
        murid={selectedMurid}
      />
    </div>
  )
}

export default DataMurid
