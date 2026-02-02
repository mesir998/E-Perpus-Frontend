// 📂 src/components/notifications/Pagination.jsx

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  return (
    <div className="flex justify-between items-center px-4 py-3 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-b-lg">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className={`px-3 py-1.5 rounded text-sm font-medium transition ${
          currentPage === 1
            ? 'text-gray-400 cursor-not-allowed'
            : 'bg-white border hover:bg-gray-100 text-gray-700 shadow-sm'
        }`}
      >
        Previous
      </button>

      <span className="text-gray-600 dark:text-gray-300 text-xs font-medium">
        Hal {currentPage} dari {totalPages}
      </span>

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`px-3 py-1.5 rounded text-sm font-medium transition ${
          currentPage === totalPages
            ? 'text-gray-400 cursor-not-allowed'
            : 'bg-white border hover:bg-gray-100 text-gray-700 shadow-sm'
        }`}
      >
        Next
      </button>
    </div>
  )
}
