// 📂 src/hooks/useNavbar.js
import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useNotifications } from './useNotifications' // Import hook notifikasi lu

export const useNavbar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // UI State
  const [isOpen, setIsOpen] = useState(false) // Menu Mobile
  const [dropdownOpen, setDropdownOpen] = useState(false) // Dropdown User
  const [showNotifModal, setShowNotifModal] = useState(false)
  const [selectedNotif, setSelectedNotif] = useState(null)

  const dropdownRef = useRef(null)

  // Auth Data
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  const token = localStorage.getItem('token')
  const isUserAdmin = user?.role === 'admin'
  const isMurid = user?.role === 'murid'

  // Notification Logic
  const { notifications, unreadCount, markAsRead, deleteNotification } =
    useNotifications(user, token)

  // Navigation Links Logic
  const navLinks = isMurid
    ? [
        { path: '/murid', label: 'Home' },
        { path: '/murid/book', label: 'Book' },
        { path: '/murid/help', label: 'Help' },
      ]
    : [
        { path: '/', label: 'Home' },
        { path: '/book', label: 'Book' },
        { path: '/help', label: 'Help' },
      ]

  // Helper Active Path
  const isActive = (path) => location.pathname === path

  // Handle Logout
  const handleLogout = () => {
    Swal.fire({
      title: 'Yakin ingin logout?',
      text: 'Kamu akan keluar dari akun.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Logout',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Logging out...',
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading(),
        })
        setTimeout(() => {
          localStorage.removeItem('user')
          localStorage.removeItem('token')
          window.location.href = '/'
        }, 2000)
      }
    })
  }

  // Close Dropdown on Outside Click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return {
    user,
    isUserAdmin,
    navLinks,
    isOpen,
    setIsOpen,
    dropdownOpen,
    setDropdownOpen,
    dropdownRef,
    isActive,
    handleLogout,
    // Notification props
    notifications,
    unreadCount,
    markAsRead,
    deleteNotification,
    showNotifModal,
    setShowNotifModal,
    selectedNotif,
    setSelectedNotif,
  }
}
