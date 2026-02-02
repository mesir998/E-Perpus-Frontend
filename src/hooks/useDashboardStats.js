import { useState, useEffect } from 'react'
import api from '../components/utils/api' // Pastikan path ini sesuai lokasi api util kamu

const useDashboardStats = () => {
  const [stats, setStats] = useState({
    buku: 0,
    kategori: 0,
    murid: 0,
    peminjaman: 0,
    laporan: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // Panggil semua API secara paralel biar cepat
        const [resBuku, resKategori, resMurid, resPeminjaman, resLaporan] =
          await Promise.all([
            api.get('/api/buku'),
            api.get('/api/kategori'),
            api.get('/api/murid'),
            api.get('/api/peminjaman'),
            api.get('/api/laporan'),
          ])

        // Update state sekaligus
        setStats({
          buku: resBuku.data.length || 0,
          kategori: resKategori.data.data ? resKategori.data.data.length : 0,
          murid: resMurid.data.data ? resMurid.data.data.length : 0,
          peminjaman: resPeminjaman.data.length || 0,
          laporan: resLaporan.data.data ? resLaporan.data.data.length : 0,
        })
      } catch (err) {
        console.error('Gagal memuat statistik dashboard:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { stats, loading }
}

export default useDashboardStats
