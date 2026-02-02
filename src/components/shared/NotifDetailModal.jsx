import Swal from 'sweetalert2'

function NotifDetailModal({ notif, onClose, onDelete }) {
  if (!notif) return null

  // 🔥 HELPER PARSE JSON
  const getDetailData = () => {
    const rawMsg = notif.pesan || notif.message
    try {
      return JSON.parse(rawMsg)
    } catch (e) {
      return { short_message: rawMsg, isLegacy: true }
    }
  }

  const data = getDetailData()

  // Helper Date
  const getValidDate = () => {
    const dateValue = notif.created_at || notif.createdAt
    if (!dateValue) return 'Tanggal tidak tersedia'
    try {
      const date = new Date(dateValue)
      if (isNaN(date.getTime())) return '-'
      return date.toLocaleString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch (e) {
      return '-'
    }
  }

  const handleDeleteClick = () => {
    onClose()
    Swal.fire({
      title: 'Hapus Notifikasi?',
      text: 'Notifikasi ini akan dihapus permanen.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed && onDelete) {
        onDelete(notif.id)
      }
    })
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-[60] animate-fadeIn p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-[500px] overflow-hidden relative">
        {/* Header */}
        <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-between items-center border-b dark:border-gray-600">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
            📩 Detail Notifikasi
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* 🔥 JIKA ADA KODE BOOKING */}
          {data.booking_code && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4 text-center">
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-300 uppercase tracking-wider">
                Kode Booking
              </span>
              <div className="text-2xl font-mono font-black text-blue-700 dark:text-blue-400 mt-1 tracking-wide select-all">
                {data.booking_code}
              </div>
            </div>
          )}

          {/* 🔥 TABLE DETAIL */}
          {!data.isLegacy ? (
            <div className="border rounded-lg overflow-hidden dark:border-gray-600">
              <table className="w-full text-sm text-left">
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {data.user_name && (
                    <tr className="bg-gray-50/50 dark:bg-gray-700/30">
                      <td className="px-4 py-3 text-gray-500 font-medium w-1/3">
                        Peminjam
                      </td>
                      <td className="px-4 py-3 font-semibold dark:text-gray-200">
                        {data.user_name}
                      </td>
                    </tr>
                  )}
                  {data.book_title && (
                    <tr>
                      <td className="px-4 py-3 text-gray-500 font-medium">
                        Buku
                      </td>
                      <td className="px-4 py-3 dark:text-gray-200">
                        {data.book_title}
                      </td>
                    </tr>
                  )}
                  {data.qty && (
                    <tr className="bg-gray-50/50 dark:bg-gray-700/30">
                      <td className="px-4 py-3 text-gray-500 font-medium">
                        Jumlah
                      </td>
                      <td className="px-4 py-3 dark:text-gray-200">
                        {data.qty} Eks
                      </td>
                    </tr>
                  )}
                  {/* Pesan body default */}
                  {data.body && (
                    <tr>
                      <td className="px-4 py-3 text-gray-500 font-medium">
                        Pesan
                      </td>
                      <td className="px-4 py-3 dark:text-gray-200">
                        {data.body}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            // Tampilan Legacy
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border">
              {data.short_message}
            </p>
          )}

          {/* Tanggal */}
          <div className="flex items-center gap-2 text-xs text-gray-400 justify-end mt-2">
            <span>📅 Diterima:</span>
            <span>{getValidDate()}</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t dark:border-gray-600 flex justify-between items-center">
          {/* 🔥 UPDATE: TOMBOL HAPUS DENGAN ICON TRASH */}
          <button
            onClick={handleDeleteClick}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-2 rounded-lg transition text-sm font-medium"
            title="Hapus Notifikasi"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
            <span>Hapus Permanen</span>
          </button>

          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-2 rounded-lg transition text-sm font-semibold shadow-lg shadow-slate-200/50"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotifDetailModal
