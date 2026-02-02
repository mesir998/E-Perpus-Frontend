import { useState } from 'react'
import PropTypes from 'prop-types'
import { Bell, Menu } from 'lucide-react'

import UserDropdown from './UserDropdown'
import NotifikasiModal from '../../notifications/NotifikasiModal'
import NotifDetailModal from '../../shared/NotifDetailModal'

// 🔹 Import custom hook notifikasi
import { useNotifications } from '../../../hooks/useNotifications'

// 🔹 Hook auth sederhana
const useAuth = () => {
  const storedUser = localStorage.getItem('user')
  const user = storedUser ? JSON.parse(storedUser) : {}

  return {
    id: user.id,
    role: user.role,
    token: localStorage.getItem('token'),
    isLoggedIn: !!user.id,
  }
}

const TopBarAdmin = ({ onToggleSidebar }) => {
  const user = useAuth()

  const [showNotifModal, setShowNotifModal] = useState(false)
  const [selectedNotif, setSelectedNotif] = useState(null)

  // 🔹 Ambil data & fungsi dari custom hook notifikasi
  const {
    notifications,
    unreadCount,
    markAsRead,
    deleteNotification, // <-- Fungsi hapus dari hook
  } = useNotifications(user, user.token)

  return (
    <div className="bg-white px-4 md:px-6 py-3 shadow flex justify-between items-center">
      {/* 🔹 Tombol Sidebar & Judul */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="text-gray-700 hover:text-gray-900 md:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800 hidden md:block">
          Dashboard Admin
        </h1>
      </div>

      {/* 🔹 Aksi kanan (Lonceng & User Dropdown) */}
      <div className="flex items-center gap-3 sm:gap-4 text-gray-700 text-xl">
        {/* Tombol Notifikasi */}
        <button
          onClick={() => setShowNotifModal(true)}
          className="relative hover:text-blue-600 transition"
        >
          <Bell className="w-6 h-6" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Dropdown User */}
        <UserDropdown />
      </div>

      {/* 🧾 Modal Daftar Notifikasi */}
      <NotifikasiModal
        title="Riwayat Notifikasi Admin"
        show={showNotifModal}
        onClose={() => setShowNotifModal(false)}
        notifications={notifications}
        markAsRead={markAsRead}
        onSelectNotif={(notif) => setSelectedNotif(notif)}
      />

      {/* 🔍 Modal Detail Notifikasi */}
      <NotifDetailModal
        notif={selectedNotif}
        onClose={() => setSelectedNotif(null)}
        onDelete={deleteNotification} // <-- Fungsi hapus tersambung ke hook
      />
    </div>
  )
}

TopBarAdmin.propTypes = {
  onToggleSidebar: PropTypes.func.isRequired,
}

export default TopBarAdmin
