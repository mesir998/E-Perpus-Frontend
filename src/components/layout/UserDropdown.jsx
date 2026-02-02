// 📂 src/components/layout/UserDropdown.jsx
import { Link } from 'react-router-dom'
import { UserCircle, Bell, User, History, LogOut } from 'lucide-react'

export default function UserDropdown({
  user,
  isUserAdmin,
  dropdownOpen,
  setDropdownOpen,
  dropdownRef,
  unreadCount,
  onShowNotif,
  onLogout,
}) {
  const profilePath = isUserAdmin ? '/admin/profile' : '/murid/profile'

  return (
    <li ref={dropdownRef} className="relative md:ml-3">
      {/* Avatar Button */}
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full text-white hover:text-teal-400 transition relative"
      >
        <UserCircle className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className=" absolute top-14 z-50 w-60 py-2 bg-[#0f172a] border border-slate-700 rounded-md shadow-xl left-1/2 -translate-x-1/2 md:left-auto md:right-0 md:translate-x-0 ">
          {/* Notifikasi */}
          <button
            onClick={() => {
              setDropdownOpen(false)
              onShowNotif()
            }}
            className="w-full flex items-center justify-between px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <span className="flex items-center gap-3 font-medium">
              <Bell className="w-5 h-5" /> Notifikasi
            </span>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Profile */}
          <Link
            to={profilePath}
            onClick={() => setDropdownOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors font-medium"
          >
            <User className="w-5 h-5" /> Profile
          </Link>

          {/* Riwayat (Murid Only) */}
          {!isUserAdmin && (
            <Link
              to="/murid/riwayat"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors font-medium"
            >
              <History className="w-5 h-5" /> Riwayat Peminjaman
            </Link>
          )}

          <div className="my-1 border-t border-slate-700"></div>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-left text-red-400 hover:bg-slate-800 hover:text-red-300 transition-colors font-medium"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      )}
    </li>
  )
}
