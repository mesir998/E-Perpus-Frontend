import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Swal from 'sweetalert2'
import { useLocation } from 'react-router-dom'
import { WifiOff } from 'lucide-react' // Tambahkan icon ini

// Import Components
import Navbar from './layout/Navbar'
import Footer from './views/fitur/Footer'
import { connectSocket, subscribeToNotifications } from './utils/socketService'

// HOOKS
import { useOnlineStatus } from '../hooks/useOnlineStatus' // Import hook deteksi online

const useAuth = () => {
  const storedUser = localStorage.getItem('user')
  const user = storedUser ? JSON.parse(storedUser) : {}
  return {
    id: user.id,
    role: user.role,
    isLoggedIn: !!user.id,
  }
}

function Layout({ children, noPadding = false }) {
  const user = useAuth()
  const location = useLocation()
  const isOnline = useOnlineStatus() // 1. Ambil status internet real-time

  const isAdminPage = location.pathname.startsWith('/admin')

  // ... (useEffect Socket & Notification tetep sama kayak kode lu) ...
  useEffect(() => {
    if (user.isLoggedIn && user.id) {
      connectSocket(user.id)
    }
  }, [user.isLoggedIn, user.id])

  useEffect(() => {
    if (!user.isLoggedIn || !user.role) return
    const eventName =
      user.role === 'admin' ? 'new_admin_notification' : 'new_notification'
    const handleNotification = (notificationData) => {
      // ... (Logika handleNotification lu di sini) ...
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'info',
        title: 'Notifikasi',
        html: notificationData?.pesan || 'Ada info baru',
        timer: 4000,
        showConfirmButton: false,
      })
    }
    const cleanup = subscribeToNotifications(eventName, handleNotification)
    return cleanup
  }, [user.isLoggedIn, user.role])

  return (
    <div className="flex flex-col min-h-screen">
      {/* 2. BANNER OFFLINE (Muncul otomatis kalau koneksi putus) */}
      {!isOnline && (
        <div className="bg-red-600 text-white py-2 px-4 flex items-center justify-center gap-2 sticky top-0 z-[10000] animate-pulse">
          <WifiOff size={18} />
          <span className="text-xs md:text-sm font-bold tracking-wide">
            KONEKSI TERPUTUS: Kamu sedang offline. Beberapa fitur data mungkin
            tidak sinkron.
          </span>
        </div>
      )}

      <Navbar />

      <main className={`${noPadding ? '' : 'pt-[100px]'} flex-grow`}>
        {children}
      </main>

      {!isAdminPage && <Footer />}
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  noPadding: PropTypes.bool,
}

export default Layout
