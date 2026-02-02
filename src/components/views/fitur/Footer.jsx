import { useLocation, Link } from 'react-router-dom'

function Footer() {
  const location = useLocation()

  // Logic cek user
  const isMurid = location.pathname.startsWith('/murid')
  const basePath = isMurid ? '/murid' : ''

  return (
    <footer className="bg-slate-900 text-white pt-10 pb-6 mt-auto">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* KOLOM 1: BRANDING & IDENTITAS (Tetap Rata Kiri) */}
          <div>
            <Link
              to={isMurid ? '/murid' : '/'}
              className="flex items-center gap-3 mb-4 w-max"
            >
              <img
                src="/assets/logo.png"
                alt="Logo E-Perpus"
                className="h-10 w-10 object-contain bg-white rounded-full p-1"
              />
              <span className="text-2xl font-semibold font-montserrat tracking-widest uppercase text-teal-400">
                E-<span className="text-blue-400">Perpus</span>
              </span>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Perpustakaan Digital SMA Ki Hajar Dewantoro. <br />
              Akses ribuan koleksi buku digital dengan mudah, kapan saja dan di
              mana saja.
            </p>
          </div>

          {/* KOLOM 2: QUICK LINKS (Menu Cepat) - INI YANG DIUBAH */}
          {/* Tambahin: flex flex-col md:items-center */}
          <div className="flex flex-col md:items-center">
            <div>
              {' '}
              {/* Div tambahan biar text-align nya rapih secar block */}
              <h3 className="text-lg font-bold mb-4">Menu Cepat</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    to={isMurid ? '/murid' : '/'}
                    className="hover:text-teal-400 transition-colors duration-200"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to={`${basePath}/book`}
                    className="hover:text-teal-400 transition-colors duration-200"
                  >
                    Book
                  </Link>
                </li>
                <li>
                  <Link
                    to={`${basePath}/help`}
                    className="hover:text-teal-400 transition-colors duration-200"
                  >
                    Help
                  </Link>
                </li>

                {!isMurid && (
                  <li>
                    <Link
                      to="/login"
                      className="hover:text-teal-400 transition-colors duration-200"
                    >
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* KOLOM 3: KONTAK & JAM BUKA (Tetap Rata Kiri / Kanan sesuai selera) */}
          <div>
            <h3 className="text-lg font-bold mb-4">Info & Lokasi</h3>
            <div className="text-gray-400 text-sm space-y-3">
              <p>
                <span className="block font-semibold text-white">Alamat:</span>
                JL. KH HASYIM ASHARI KM. 9 PINANG TANGERANG, Pinang, Kec.
                Pinang, Kota Tangerang Prov. Banten
              </p>
              <p>
                <span className="block font-semibold text-white">
                  Jam Operasional:
                </span>
                Senin - Jumat: 08.00 - 16.00 WIB
                <br />
                Sabtu - Minggu: Libur
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-white text-sm">
            &copy; {new Date().getFullYear()} SMA Ki Hajar Dewantoro. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
