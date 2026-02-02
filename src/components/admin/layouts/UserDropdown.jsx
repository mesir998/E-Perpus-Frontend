import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserCircle, LogOut, User } from 'lucide-react'
import Swal from 'sweetalert2'

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()

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
          html: 'Tunggu sebentar...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading()
          },
        })
        setTimeout(() => {
          localStorage.removeItem('user')
          localStorage.removeItem('token')
          window.location.href = '/'
        }, 1200)
      }
    })
  }

  // 👇 FIX: Fungsi navigasi dynamic
  const goToProfile = () => {
    setIsOpen(false)

    // Ambil user object dari localStorage untuk menentukan role
    const storedUser = localStorage.getItem('user')
    const user = storedUser ? JSON.parse(storedUser) : null

    // Tentukan path: Admin -> /admin/profile | Murid -> /murid/profile
    const profilePath =
      user?.role === 'admin' ? '/admin/profile' : '/murid/profile'

    navigate(profilePath)
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="hover:text-blue-500"
        onClick={() => setIsOpen(!isOpen)}
        title="Profil"
      >
        <UserCircle size={26} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 min-w-[10rem] bg-white border rounded shadow z-50 text-sm sm:text-base">
          <ul className="text-gray-700">
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
              onClick={goToProfile} // ✅ Panggil handler dynamic
            >
              <User size={16} />
              Profil
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2 text-red-600"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default UserDropdown
