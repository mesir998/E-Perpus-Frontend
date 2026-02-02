// 📂 src/components/notifications/NotifikasiModal.jsx
import NotificationItem from './NotificationItem'
import Pagination from './Pagination'
import { usePagination } from '../../hooks/usePagination' // 👈 Import Hook Baru

function NotifikasiModal({
  show,
  onClose,
  title,
  notifications,
  markAsRead,
  onSelectNotif,
}) {
  // 🔥 Panggil Hook Pagination (Logic & Effect udah di dalem sini)
  // Parameter ke-3 adalah 'show', jadi pas show=true, otomatis reset ke page 1
  const { currentData, currentPage, totalPages, setCurrentPage } =
    usePagination(notifications, 10, show)

  if (!show) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-[90%] max-w-[600px] max-h-[80vh] flex flex-col relative">
        {/* HEADER */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold p-2"
        >
          ✕
        </button>
        <h3 className="text-xl font-semibold text-center py-5 border-b dark:border-gray-700">
          {title}
        </h3>

        {/* LIST CONTENT */}
        <div className="overflow-y-auto flex-1 px-4 divide-y divide-gray-200 dark:divide-gray-700">
          {currentData.length > 0 ? (
            currentData.map((notif, index) => (
              <NotificationItem
                key={notif.id || index}
                notif={notif}
                onClick={() => {
                  if (notif.id) markAsRead(notif.id)
                  onSelectNotif(notif)
                  onClose()
                }}
              />
            ))
          ) : (
            <div className="p-8 text-center flex flex-col items-center justify-center text-gray-400">
              <span className="text-4xl mb-2">🔕</span>
              <p>Tidak ada notifikasi baru</p>
            </div>
          )}
        </div>

        {/* FOOTER / PAGINATION */}
        {totalPages > 1 ? (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        ) : (
          <div className="p-4 border-t dark:border-gray-700 flex justify-end">
            <button
              onClick={onClose}
              className="bg-slate-800 hover:bg-slate-900 text-white px-5 py-2 rounded-lg transition text-sm font-semibold shadow-sm"
            >
              Tutup
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default NotifikasiModal
