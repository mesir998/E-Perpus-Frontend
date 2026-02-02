import { useNavigate } from 'react-router-dom'
import Typewriter from 'typewriter-effect'
import { jwtDecode } from 'jwt-decode' // 1. Import ini bre

function Jumbotron() {
  const navigate = useNavigate()

  // 2. Bikin fungsi handler biar logic-nya rapi
  const handleGetStarted = () => {
    const token = localStorage.getItem('token')

    if (token) {
      try {
        const decoded = jwtDecode(token)

        // --- LOGIC BARU BERDASARKAN role_id ---

        // Cek ID 4 (Murid) -> Masuk jalur Murid
        if (decoded.role_id === 4) {
          navigate('/murid/book')
        }
        // Cek ID 1 (Biasanya Admin) -> Masuk jalur Admin
        // (Sesuaikan angka '1' ini kalau ternyata di database lu admin itu role_id nya 2 atau yg lain)
        else if (decoded.role_id === 1) {
          navigate('/admin/dashboard')
        }
        // Kalau role_id lain, lempar ke public aja
        else {
          navigate('/book')
        }
      } catch (error) {
        console.error('Token Error:', error)
        navigate('/book')
      }
    } else {
      // Tidak ada token (Tamu) -> Masuk jalur Public
      navigate('/book')
    }
  }

  return (
    <section className="w-full min-h-screen flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-20 py-12 bg-gray-50 overflow-hidden">
      {/* BAGIAN KIRI */}
      <div className="w-full lg:w-1/2 flex flex-col items-start space-y-6 text-slate-800 z-10 mt-10 lg:mt-0">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight flex flex-col gap-2">
          Perpustakaan Digital
          <span className="text-blue-600">
            <Typewriter
              options={{
                strings: ['SMA Ki Hajar Dewantoro'],
                autoStart: true,
                loop: true,
                delay: 80,
                deleteSpeed: 50,
              }}
            />
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-600 max-w-lg">
          Akses ribuan buku digital dan koleksi lengkap dengan mudah di mana
          saja dan kapan saja.
        </p>

        {/* 5. PANGGIL FUNGSINYA DI SINI */}
        <button
          onClick={handleGetStarted}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          Get Started
        </button>
      </div>

      {/* BAGIAN KANAN */}
      <div className="w-full lg:w-1/2 flex justify-center lg:justify-end z-0">
        <img
          src="/assets/jumbotron.svg"
          alt="Ilustrasi Perpustakaan"
          className="w-full max-w-md lg:max-w-xl h-auto drop-shadow-xl"
        />
      </div>
    </section>
  )
}

export default Jumbotron
