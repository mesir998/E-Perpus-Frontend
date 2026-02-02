import React from 'react'
import {
  BookOpen,
  Building,
  User,
  Package,
  CheckCircle,
  XCircle,
  Tag,
  FileText,
} from 'lucide-react'

const BookInfoCard = ({ book }) => {
  return (
    <div className="bg-white rounded shadow p-6 w-full text-left h-fit border border-gray-100">
      {/* GRID LAYOUT: Bagian Info dipecah jadi 2 Kolom */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-4">
        {/* Kolom Kiri */}
        <div className="space-y-3">
          <p className="flex items-center gap-2">
            <BookOpen size={18} className="text-blue-600 flex-shrink-0" />
            <span className="font-medium text-gray-900 truncate">
              {book.judul}
            </span>
          </p>
          <p className="flex items-center gap-2">
            <Building size={18} className="text-gray-600 flex-shrink-0" />
            <span className="text-gray-700">{book.penerbit || '-'}</span>
          </p>
          <p className="flex items-center gap-2">
            <User size={18} className="text-gray-600 flex-shrink-0" />
            <span className="text-gray-700">{book.penulis || '-'}</span>
          </p>
        </div>

        {/* Kolom Kanan */}
        <div className="space-y-3">
          <p className="flex items-center gap-2">
            <Package size={18} className="text-gray-600 flex-shrink-0" />
            <span className="text-gray-700">
              Stok: <strong>{book.stok || '-'}</strong>
            </span>
          </p>
          <p className="flex items-center gap-2">
            {book.status === 'tersedia' ? (
              <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
            ) : (
              <XCircle size={18} className="text-red-600 flex-shrink-0" />
            )}
            <span
              className={`uppercase font-bold text-sm px-2 py-0.5 rounded ${
                book.status === 'tersedia'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {book.status || '-'}
            </span>
          </p>
          <p className="flex items-center gap-2">
            <Tag size={18} className="text-gray-600 flex-shrink-0" />
            <span className="text-gray-700">{book.kategori_nama || '-'}</span>
          </p>
        </div>
      </div>

      {/* SINOPSIS: Tetap Full Width di Bawah */}
      <div className="pt-4 mt-2 border-t border-gray-100">
        <p className="flex items-start gap-2">
          <FileText size={18} className="text-blue-600 flex-shrink-0 mt-1" />
          <span className="w-full">
            <strong className="block text-gray-900 mb-1">Sinopsis:</strong>
            <span className="text-gray-600 font-normal text-sm text-justify block leading-relaxed">
              {book.deskripsi || (
                <span className="italic text-gray-400">
                  Tidak ada deskripsi.
                </span>
              )}
            </span>
          </span>
        </p>
      </div>
    </div>
  )
}

export default BookInfoCard
