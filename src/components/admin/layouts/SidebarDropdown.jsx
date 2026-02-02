import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ChevronDown, ChevronUp } from 'lucide-react'
import PropTypes from 'prop-types'

const SidebarDropdown = ({
  item,
  setIsOpen,
  bookMenuOpen,
  setBookMenuOpen,
  isBookPathActive,
}) => {
  const navigate = useNavigate()
  // Opsional: Kalau lu mau klik "Buku" cuma buka dropdown doang (gak langsung pindah halaman),
  // baris defaultPath dan logic navigate di bawah bisa lu hapus/komentar.
  const defaultPath = item.submenus[0]?.path || '#'

  const handleDropdownClick = (e) => {
    // Prevent default biar gak aneh behaviornya
    e.preventDefault()

    // 1. Toggle buka/tutup dropdown
    setBookMenuOpen((prev) => !prev)

    // 2. (Opsional) Auto-navigate ke submenu pertama pas dibuka
    // Kalau lu mau user klik dropdown DULU baru pilih menu, baris ini bisa di-comment.
    if (!bookMenuOpen && defaultPath !== '#') navigate(defaultPath)

    // ❌ DIBUANG: Jangan tutup sidebar pas klik parent menu!
    // if (setIsOpen) setIsOpen(false)
  }

  return (
    <li>
      <button
        onClick={handleDropdownClick}
        className={`flex items-center justify-between w-full px-2 py-1.5 rounded transition duration-300 ${
          bookMenuOpen || isBookPathActive
            ? 'bg-gray-700 text-teal-400'
            : 'text-white hover:bg-gray-700'
        }`}
      >
        <div className="flex items-center gap-3">
          {item.icon}
          {item.name}
        </div>
        {bookMenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {/* Render Submenu */}
      {bookMenuOpen && (
        <ul className="pl-6 pt-2 space-y-2">
          {item.submenus.map((sub) => (
            <li key={sub.path}>
              <NavLink
                to={sub.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-2 py-1.5 rounded text-sm transition duration-300 ${
                    isActive
                      ? 'text-blue-300 font-semibold'
                      : 'text-white hover:text-teal-400 hover:bg-gray-700'
                  }`
                }
                // ✅ BENAR: Tutup sidebar CUMA kalau user klik submenu (item anaknya)
                onClick={() => setIsOpen && setIsOpen(false)}
              >
                {sub.icon}
                {sub.name}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}

SidebarDropdown.propTypes = {
  item: PropTypes.object.isRequired,
  setIsOpen: PropTypes.func.isRequired, // Pastikan ini dikirim dari parent (Sidebar.jsx)
  bookMenuOpen: PropTypes.bool.isRequired,
  setBookMenuOpen: PropTypes.func.isRequired,
  isBookPathActive: PropTypes.bool.isRequired,
}

export default SidebarDropdown
