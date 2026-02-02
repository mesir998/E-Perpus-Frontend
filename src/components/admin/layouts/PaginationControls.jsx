import PropTypes from 'prop-types'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const PaginationControls = ({
  currentPage,
  totalPages,
  totalItems,
  startIndex,
  endIndex,
  handlePrevPage,
  handleNextPage,
  originalTotalItems = totalItems,
  isFiltered = false,
  dataType = 'data',
}) => {
  // Sembunyikan kontrol jika hanya ada 1 halaman atau kurang, dan tidak ada item
  if (totalPages <= 1 && totalItems === 0) return null

  // --- LOGIKA TEXT SUMMARY (Sama seperti sebelumnya) ---
  let summaryText
  const dataLabel = dataType.toLowerCase()

  if (totalPages > 1) {
    summaryText = `Menampilkan ${startIndex + 1} sampai ${Math.min(endIndex, totalItems)} dari total ${totalItems} ${dataLabel}`
  } else {
    if (isFiltered && originalTotalItems > totalItems) {
      summaryText = `Menampilkan ${totalItems} hasil pencarian (dari ${originalTotalItems} total ${dataLabel})`
    } else {
      summaryText = `Menampilkan ${totalItems} ${dataLabel} dari total ${originalTotalItems} jumlah ${dataLabel}`
    }
  }

  const ITEMS_PER_PAGE = 10
  if (totalItems > ITEMS_PER_PAGE && totalPages > 1) {
    summaryText = `Menampilkan ${startIndex + 1} sampai ${Math.min(endIndex, totalItems)} dari total ${totalItems} ${dataLabel}`
  }
  // ----------------------------------------------------

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-3 sm:px-4 sm:py-3 border-t bg-gray-50 gap-3 sm:gap-0">
      <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-left w-full sm:w-auto order-2 sm:order-1">
        <span dangerouslySetInnerHTML={{ __html: summaryText }} />
      </p>

      {/* PAGINATION BUTTONS */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 w-full sm:w-auto order-1 sm:order-2">
          {/* TOMBOL PREV */}
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`flex items-center justify-center w-8 h-8 rounded-md transition border ${
              currentPage === 1
                ? 'text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed'
                : 'text-blue-600 bg-white border-gray-300 hover:bg-gray-100 active:scale-95'
            }`}
            title="Previous Page"
          >
            <ChevronLeft size={16} />
          </button>

          {/* TEXT HALAMAN */}
          {/* Mobile: text-xs */}
          {/* Desktop: text-sm */}
          <span className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">
            Halaman {currentPage} dari {totalPages}
          </span>

          {/* TOMBOL NEXT */}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center w-8 h-8 rounded-md transition border ${
              currentPage === totalPages
                ? 'text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed'
                : 'text-blue-600 bg-white border-gray-300 hover:bg-gray-100 active:scale-95'
            }`}
            title="Next Page"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  )
}

PaginationControls.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  startIndex: PropTypes.number.isRequired,
  endIndex: PropTypes.number.isRequired,
  handlePrevPage: PropTypes.func.isRequired,
  handleNextPage: PropTypes.func.isRequired,
  originalTotalItems: PropTypes.number,
  isFiltered: PropTypes.bool,
  dataType: PropTypes.string,
}

export default PaginationControls
