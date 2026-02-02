import { X } from 'lucide-react'

export default function LaporanDetailModal({ data, onClose }) {
  if (!data) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 px-6 py-4 flex justify-between items-center text-white">
          <h3 className="font-semibold">Detail Transaksi</h3>
          <button
            onClick={onClose}
            className="hover:bg-blue-700 p-1 rounded transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-3 text-sm">
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Kode Booking</span>
            <span className="font-bold">{data.kode_booking}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Nama Peminjam</span>
            <span className="font-medium text-right">
              {data.nama_murid}
              <br />
              <span className="text-xs text-gray-400">NIS: {data.nis}</span>
            </span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Buku</span>
            <span className="font-medium text-right">
              {data.judul}
              <br />
              <span className="text-xs text-gray-400">
                Kode: {data.kode_eksemplar}
              </span>
            </span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Tgl Pinjam</span>
            <span>
              {new Date(data.tanggal_pinjam).toLocaleDateString('id-ID')}
            </span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Tgl Kembali (Jadwal)</span>
            <span>
              {new Date(data.tanggal_kembali).toLocaleDateString('id-ID')}
            </span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Dikembalikan Pada</span>
            <span>
              {data.tanggal_actual
                ? new Date(data.tanggal_actual).toLocaleDateString('id-ID')
                : '-'}
            </span>
          </div>

          {/* Bagian Denda */}
          <div className="flex justify-between pt-2">
            <span className="text-gray-500">Denda</span>
            <span
              className={`font-bold ${
                data.denda > 0 ? 'text-red-600' : 'text-gray-800'
              }`}
            >
              {data.denda ? `Rp ${data.denda.toLocaleString('id-ID')}` : 'Rp 0'}
            </span>
          </div>

          {/* 🔥 UPDATE BARU: KETERANGAN DENDA (BOX MERAH) 🔥 */}
          {data.keterangan && (
            <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded-lg flex items-start gap-3">
              <div className="w-full">
                <span className="block text-xs font-bold text-red-600 uppercase mb-1">
                  Keterangan / Alasan
                </span>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap text-justify">
                  {data.keterangan}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-300 transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  )
}
