import { useEffect } from 'react'
import Typewriter from 'typewriter-effect'
import AOS from 'aos'
import 'aos/dist/aos.css'

function AboutUs() {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true,
    })
  }, [])

  return (
    <section className="w-full py-16 md:py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12" data-aos="fade-down">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4 h-12 flex items-center justify-center">
            <Typewriter
              options={{
                strings: ['Tentang Kami'],
                autoStart: true,
                loop: true,
                delay: 75,
              }}
            />
          </h2>
        </div>

        {/* ✅ PERBAIKAN 1: Gunakan 'items-center' agar vertikal sejajar tengah */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Kolom Kiri: Gambar */}
          <div
            className="flex justify-center md:justify-end"
            data-aos="fade-right"
          >
            {/* Jangan lupa ganti src ini dengan foto asli perpus kamu yang tadi (image_3345fa.jpg) biar lebih valid */}
            <img
              src="/assets/perpustakaan.svg"
              alt="Ilustrasi Perpustakaan Digital"
              className="w-full max-w-sm md:max-w-md h-auto drop-shadow-xl hover:scale-105 transition-transform duration-300 rounded-xl"
            />
          </div>

          {/* Kolom Kanan: Teks */}
          {/* ✅ PERBAIKAN 2: Hapus 'md:pt-8'. Biarkan Flexbox/Grid yang mengatur posisinya */}
          <div className="text-center md:text-left" data-aos="fade-left">
            <p className="text-gray-600 leading-relaxed text-lg mb-6 text-justify">
              Pada tahun 2007 tepatnya pada tanggal 9 April, SMA Ki Hajar
              Dewantoro Kota Tangerang didirikan di JL. KH Hasyim Ashari KM. 9
              Pinang Tangerang, Pinang, Kec. Pinang, Kota Tangerang Prov.
              Banten.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg text-justify">
              Sekolah ini menjadi salah satu institusi pendidikan yang memiliki
              komitmen dalam menyediakan sarana dan prasarana penunjang
              pembelajaran, termasuk diantaranya adalah fasilitas perpustakaan.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs
