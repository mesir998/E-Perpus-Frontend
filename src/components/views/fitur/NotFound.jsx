import { Link } from 'react-router-dom'

function NotFound() {
  let redirectPath = '/'

  try {
    const storedUser = localStorage.getItem('user')
    // ✅ Pastikan storedUser bukan string "undefined"
    if (storedUser && storedUser !== 'undefined') {
      const user = JSON.parse(storedUser)
      if (user.role === 'admin') {
        redirectPath = '/admin'
      } else if (user.role === 'murid') {
        redirectPath = '/murid'
      }
    }
  } catch (err) {
    console.error('Gagal parsing user di NotFound:', err)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-center p-4">
      <h1 className="text-6xl font-bold text-blue-700 dark:text-blue-400">
        404
      </h1>
      <p className="text-xl mt-4 text-gray-700 dark:text-gray-300">
        Halaman tidak ditemukan
      </p>
      <Link
        to={redirectPath}
        className="mt-6 inline-block bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg transition"
      >
        Kembali ke Beranda
      </Link>
    </div>
  )
}

export default NotFound
