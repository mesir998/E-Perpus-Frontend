import { useNavigate } from 'react-router-dom'
import FeatureCard from '../layouts/FeatureCard'
import { Book, FileText, Users, ClipboardList, Layers3 } from 'lucide-react'
import useDashboardStats from '../../../hooks/useDashboardStats'

// Import Chart
import ChartPeminjaman from '../components/peminjaman/ChartPeminjaman'

const Dashboard = () => {
  const { stats, loading } = useDashboardStats()
  const navigate = useNavigate()

  const dashboardFeatures = [
    {
      title: 'Manajemen Buku',
      icon: Book,
      color: 'bg-green-500',
      count: stats.buku,
      link: '/admin/DataBuku',
    },
    {
      title: 'Kategori',
      icon: Layers3,
      color: 'bg-blue-500',
      count: stats.kategori,
      link: '/admin/DataKategori',
    },
    {
      title: 'Peminjaman',
      icon: ClipboardList,
      color: 'bg-yellow-500',
      count: stats.peminjaman,
      link: '/admin/DataPeminjaman',
    },
    {
      title: 'Laporan',
      icon: FileText,
      color: 'bg-purple-600',
      count: stats.laporan,
      link: '/admin/DataLaporan',
    },
    {
      title: 'Manajemen Murid',
      icon: Users,
      color: 'bg-pink-600',
      count: stats.murid,
      link: '/admin/DataMurid',
    },
  ]

  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold mb-6">Dashboard</h1>

      {/* Bagian Kartu Atas */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-32 bg-gray-200 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {dashboardFeatures.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              icon={feature.icon}
              color={feature.color}
              count={feature.count}
              onClick={() => navigate(feature.link)}
            />
          ))}
        </div>
      )}

      {/* AREA GRAFIK - CLEAN VERSION */}
      {/* Cukup kasih margin top aja, ga usah dibungkus card lagi */}
      <div className="mt-8">
        {loading ? (
          // Skeleton Kotak Gede buat Chart pas lagi loading
          <div className="h-96 w-full bg-gray-200 rounded-xl animate-pulse border border-gray-100"></div>
        ) : (
          // Chart Asli muncul pas loading kelar
          <ChartPeminjaman />
        )}
      </div>
    </div>
  )
}

export default Dashboard
