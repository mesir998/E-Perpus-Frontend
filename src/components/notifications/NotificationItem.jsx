// 📂 src/components/notifications/NotificationItem.jsx
import { parseMessage, getNotificationStyle } from '../utils/notificationHelper'

export default function NotificationItem({ notif, onClick }) {
  // 1. Parse Data
  const data = parseMessage(notif.pesan || notif.message)

  // 2. Tentukan Style (Icon & Default Title)
  const style = getNotificationStyle(data.type)
  const displayTitle = data.title || style.title

  // 3. Tentukan Body (Short message untuk preview)
  const displayBody = data.short_message || data.body || data.message || '-'

  // 4. Format Tanggal
  const formattedDate = notif.created_at
    ? new Date(notif.created_at).toLocaleString('id-ID', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '-'

  return (
    <div
      onClick={onClick}
      className={`py-4 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 rounded-lg transition cursor-pointer flex gap-3 items-start ${
        notif.status !== 'read' ? 'bg-blue-50 dark:bg-blue-900/20' : ''
      }`}
    >
      {/* Ikon */}
      <div className="text-2xl pt-1 select-none">{style.icon}</div>

      {/* Konten */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm truncate pr-2">
            {displayTitle}
          </h4>
          <span className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0">
            {formattedDate}
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2 leading-snug">
          {displayBody}
        </p>
      </div>
    </div>
  )
}
