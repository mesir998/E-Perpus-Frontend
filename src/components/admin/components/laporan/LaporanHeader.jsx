import { FileText, Printer, FileSpreadsheet } from 'lucide-react'

export default function LaporanHeader({ onExport, onExportCSV }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
      <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <FileText className="text-blue-600" />
        Laporan Peminjaman
      </h1>

      <div className="flex gap-2">
        {/* Tombol Export CSV */}
        <button
          onClick={onExportCSV}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition shadow-sm"
        >
          <FileSpreadsheet size={18} /> Export CSV
        </button>

        {/* Tombol Export PDF */}
        <button
          onClick={onExport}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition shadow-sm"
        >
          <Printer size={18} /> Export PDF
        </button>
      </div>
    </div>
  )
}
