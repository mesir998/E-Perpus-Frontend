import { WifiOff } from 'lucide-react'
import { useOnlineStatus } from '../hooks/useOnlineStatus'

const OfflineBanner = () => {
  const isOnline = useOnlineStatus()

  if (isOnline) return null // Jika online, jangan tampilkan apa-apa

  return (
    <div className="bg-red-600 text-white py-2 px-4 flex items-center justify-center gap-2 sticky top-0 z-[9999] animate-bounce">
      <WifiOff size={20} />
      <span className="text-sm font-bold">
        Koneksi Terputus! Kamu sedang dalam mode offline. Beberapa fitur mungkin
        tidak tersedia.
      </span>
    </div>
  )
}

export default OfflineBanner
