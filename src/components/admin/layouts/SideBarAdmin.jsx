import React, { useState, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  X,
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  FileText,
  Users,
  Layers3,
  Package,
  Box,
} from 'lucide-react'

import SidebarLink from './SidebarLink'
import SidebarDropdown from './SidebarDropdown'

// ==========================================================
// 🔹 DATA MENU (STATIC)
// ==========================================================
const STATIC_MENU = [
  {
    name: 'Dashboard',
    path: '/admin',
    icon: <LayoutDashboard size={18} />,
    type: 'link',
  },
  {
    name: 'Buku',
    icon: <BookOpen size={18} />,
    type: 'dropdown',
    submenus: [
      {
        name: 'Data Buku',
        path: '/admin/DataBuku',
        icon: <Package size={18} />,
      },
      {
        name: 'Buku Eksemplar',
        path: '/admin/DataEksemplar',
        icon: <Box size={18} />,
      },
    ],
  },
  {
    name: 'Kategori',
    path: '/admin/DataKategori',
    icon: <Layers3 size={18} />,
    type: 'link',
  },
  {
    name: 'Murid',
    path: '/admin/DataMurid',
    icon: <Users size={18} />,
    type: 'link',
  },
  {
    name: 'Peminjaman',
    path: '/admin/DataPeminjaman',
    icon: <ClipboardList size={18} />,
    type: 'link',
  },
  {
    name: 'Laporan',
    path: '/admin/DataLaporan',
    icon: <FileText size={18} />,
    type: 'link',
  },
]

// ==========================================================
// 🔹 SIDEBAR ADMIN
// ==========================================================
const SideBarAdmin = ({ isOpen, setIsOpen }) => {
  const [bookMenuOpen, setBookMenuOpen] = useState(false)
  const location = useLocation()

  // Deteksi apakah sedang di path salah satu submenu Buku
  const isBookPathActive = useMemo(() => {
    const bookItem = STATIC_MENU.find((item) => item.name === 'Buku')
    if (!bookItem?.submenus) return false
    return bookItem.submenus.some((sub) =>
      location.pathname.startsWith(sub.path)
    )
  }, [location.pathname])

  // Auto buka dropdown kalau sedang di halaman Buku
  useEffect(() => {
    setBookMenuOpen(isBookPathActive)
  }, [isBookPathActive])

  // Tutup dropdown kalau sidebar ditutup (mobile)
  useEffect(() => {
    if (!isOpen) setBookMenuOpen(false)
  }, [isOpen])

  return (
    <>
      {/* Overlay (Mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed z-50 lg:static top-0 left-0 h-full w-64 bg-gray-800 text-white
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h1 className="flex items-center text-lg font-bold gap-2">
            <img
              src="/assets/logo.png"
              alt="E-Perpus Logo"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-xl font-semibold font-montserrat tracking-widest uppercase text-teal-400 leading-none">
              E-
              <span className="text-blue-400">PERPUS</span>
            </span>
          </h1>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu */}
        <ul className="px-4 space-y-4 mt-6">
          {STATIC_MENU.map((item) =>
            item.type === 'dropdown' ? (
              <SidebarDropdown
                key={item.name}
                item={item}
                setIsOpen={setIsOpen}
                bookMenuOpen={bookMenuOpen}
                setBookMenuOpen={setBookMenuOpen}
                isBookPathActive={isBookPathActive}
              />
            ) : (
              <SidebarLink key={item.name} item={item} setIsOpen={setIsOpen} />
            )
          )}
        </ul>
      </div>
    </>
  )
}

SideBarAdmin.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
}

export default SideBarAdmin
