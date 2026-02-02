// 📂 src/components/layout/Navbar.jsx
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

// Hooks & Components
import { useNavbar } from '../../hooks/useNavbar'
import NavbarLinks from './NavbarLinks'
import UserDropdown from './UserDropdown'
import NotifikasiModal from '../notifications/NotifikasiModal'
import NotifDetailModal from '../shared/NotifDetailModal'

function Navbar() {
  const {
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
    notifications,
    unreadCount,
    markAsRead,
    deleteNotification,
    showNotifModal,
    setShowNotifModal,
    selectedNotif,
    setSelectedNotif,
  } = useNavbar()

  return (
    <nav className="bg-slate-900 shadow-sm fixed top-0 left-0 w-full z-50 border-b border-gray-800">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* LOGO */}
        <Link
          to={isUserAdmin ? '/admin' : user?.role === 'murid' ? '/murid' : '/'}
          className="flex items-center space-x-3"
        >
          <img src="/assets/logo.png" className="h-14" alt="Logo" />
          <span className="text-2xl font-semibold font-montserrat tracking-widest uppercase text-teal-400">
            {/* UBAH 2: Warna teks 'Perpus' jadi terang (blue-400) biar keliatan di background gelap */}
            E-<span className="text-blue-400">Perpus</span>
          </span>
        </Link>

        {/* MOBILE MENU TOGGLE */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          // UBAH 3: Tombol menu jadi text-gray-300 dan hover terang
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-300 rounded-lg md:hidden hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* NAVIGATION LINKS CONTAINER */}
        <div
          className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}
        >
          {/* UBAH 4: Background Mobile Menu disamakan (#0f172a) dan teks dipaksa putih */}
          <ul className="font-medium flex flex-col md:flex-row p-4 md:p-0 md:space-x-6 bg-[#0f172a] md:bg-transparent border border-gray-700 md:border-none rounded-lg md:rounded-none items-center mt-4 md:mt-0">
            <div className="text-white hover:text-white flex flex-col md:flex-row gap-4 md:gap-6">
              <NavbarLinks links={navLinks} isActive={isActive} />
            </div>

            {/* User Dropdown / Login Button */}
            {user ? (
              <UserDropdown
                user={user}
                isUserAdmin={isUserAdmin}
                dropdownOpen={dropdownOpen}
                setDropdownOpen={setDropdownOpen}
                dropdownRef={dropdownRef}
                unreadCount={unreadCount}
                onShowNotif={() => setShowNotifModal(true)}
                onLogout={handleLogout}
              />
            ) : (
              <li className="list-none">
                <Link
                  to="/login"
                  className="block py-2 px-3 text-white hover:text-teal-400 font-semibold"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* MODALS (Gak perlu diubah warnanya karena overlay) */}
      <NotifikasiModal
        title={isUserAdmin ? 'Riwayat Notifikasi Admin' : 'Notifikasi'}
        show={showNotifModal}
        onClose={() => setShowNotifModal(false)}
        notifications={notifications}
        markAsRead={markAsRead}
        onSelectNotif={setSelectedNotif}
      />

      <NotifDetailModal
        notif={selectedNotif}
        onClose={() => setSelectedNotif(null)}
        onDelete={deleteNotification}
      />
    </nav>
  )
}

export default Navbar
