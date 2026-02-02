import { X, Book, Loader2, Plus, Minus, Clock } from 'lucide-react'
import { useState } from 'react'

export default function BookingModal({
  isOpen,
  onClose,
  bookTitle,
  onSubmit,
  loading,
  stokTersedia,
}) {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const today = `${year}-${month}-${day}`

  const [qty, setQty] = useState(1)

  if (!isOpen) return null

  // Helper: Format Tanggal Indo
  const formatDateIndo = (dateStr) => {
    if (!dateStr) return '-'
    const d = new Date(dateStr)
    return d.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const getEstKembali = (dateStr) => {
    if (!dateStr) return '-'
    const d = new Date(dateStr)
    d.setDate(d.getDate() + 7)
    return d.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const handleInc = () => {
    if (qty < 3 && qty < stokTersedia) setQty(qty + 1)
  }
  const handleDec = () => {
    if (qty > 1) setQty(qty - 1)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
        {/* Header */}
        <div className="bg-blue-600 p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <Book size={20} />
            <h3 className="font-bold text-lg">Konfirmasi Booking</h3>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-blue-700 p-1 rounded transition"
            disabled={loading}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Info Buku */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">
              Judul Buku
            </p>
            <p className="font-bold text-gray-900 text-lg leading-tight line-clamp-2">
              {bookTitle}
            </p>
          </div>

          {/* INPUT QUANTITY */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Jumlah Buku
            </label>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={handleDec}
                  className="p-2 hover:bg-gray-100 text-gray-600 disabled:opacity-50"
                  disabled={qty <= 1}
                >
                  <Minus size={18} />
                </button>
                <span className="w-12 text-center font-bold text-lg">
                  {qty}
                </span>
                <button
                  onClick={handleInc}
                  className="p-2 hover:bg-gray-100 text-gray-600 disabled:opacity-50"
                  disabled={qty >= 3 || qty >= stokTersedia}
                >
                  <Plus size={18} />
                </button>
              </div>
              <p className="text-sm text-gray-500">Maks. 3 buku / transaksi</p>
            </div>
          </div>

          {/* TAMPILAN TANGGAL */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Mulai Pinjam
            </label>

            <div className="w-full px-4 py-3 border border-gray-200 bg-blue-50 text-gray-700 rounded-lg font-medium cursor-not-allowed">
              {formatDateIndo(today)}{' '}
              <span className="text-xs font-normal text-gray-500">
                (Hari Ini)
              </span>
            </div>

            <div className="mt-2 text-xs text-gray-500 flex justify-between px-1 items-center">
              <span className="flex items-center gap-1">
                <Clock size={12} /> Durasi 7 hari otomatis.
              </span>
              <span>
                Kembali: <b className="text-blue-600">{getEstKembali(today)}</b>
              </span>
            </div>
          </div>

          {/* Warning */}
          <div className="flex gap-3 bg-yellow-50 text-yellow-800 p-3 rounded-lg text-sm border border-yellow-200 items-start">
            <p className="leading-snug">
              Booking akan otomatis <b>dibatalkan sistem</b> jika buku tidak
              diambil dalam <b>30 menit</b>.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-200 rounded-lg transition"
            disabled={loading}
          >
            Batal
          </button>
          <button
            onClick={() => onSubmit(today, qty)}
            disabled={loading}
            className="px-5 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Proses...
              </>
            ) : (
              'Booking Sekarang'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
