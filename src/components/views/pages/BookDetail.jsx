import Layout from '../../Layout'
import Typewriter from 'typewriter-effect'
import {
  BookOpen,
  ShoppingCart,
  User,
  Building,
  Package,
  FileText,
  Tag,
  CheckCircle,
  XCircle,
  Hash,
  DollarSign, // 1. 🔥 Import Icon Dolar
} from 'lucide-react'

// COMPONENTS
import BookingModal from '../../modals/BookingModal'
import RecommendationSection from '../fitur/RecommendationSection'

// UTILS (Sesuaikan path-nya dengan struktur folder lu)
import { formatRupiah } from '../../utils/formatRupiah'

// HOOK
import { useBookDetail } from '../../../hooks/useBookDetail'

function BookDetail() {
  const {
    book,
    recommendations,
    loading,
    isSubmitting,
    isModalOpen,
    setIsModalOpen,
    handleBookingClick,
    handleSubmitBooking,
    getImageUrl,
  } = useBookDetail()
  console.log('CEK DATA BUKU:', book)

  if (loading) return <div className="text-center py-20 italic">Memuat...</div>
  if (!book)
    return (
      <div className="text-center py-20 text-red-500">
        Buku tidak ditemukan.
      </div>
    )

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4 md:px-12 max-w-6xl">
        {/* HEADER */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold text-gray-800">
            <span className="text-slate-900">
              <Typewriter
                options={{
                  strings: ['Detail Buku'],
                  autoStart: true,
                  loop: true,
                  delay: 75,
                }}
              />
            </span>
          </h2>
        </div>

        {/* CONTENT LAYOUT UTAMA */}
        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* === KOLOM KIRI: COVER & BUTTON === */}
          <div className="w-full md:w-1/3 lg:w-1/4 flex flex-col items-center">
            <div className="relative shadow-2xl rounded-lg overflow-hidden w-full max-w-[280px] aspect-[3/4] mb-6 bg-white border border-gray-200">
              <img
                src={getImageUrl(book.cover || 'default.png')}
                className="w-full h-full object-cover"
                alt={book.judul}
              />
            </div>

            <button
              onClick={handleBookingClick}
              disabled={
                book.stok <= 0 || book.status !== 'tersedia' || isSubmitting
              }
              className={`w-full max-w-[280px] py-3 rounded-lg font-bold shadow-md transition-all flex justify-center items-center gap-2 ${
                book.stok > 0 && book.status === 'tersedia'
                  ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <ShoppingCart size={20} />
              {isSubmitting
                ? 'Memproses...'
                : book.stok > 0
                  ? 'Booking'
                  : 'Stok Habis'}
            </button>
          </div>

          {/* === KOLOM KANAN: DETAIL INFO === */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            {/* 1. Judul & Stok */}
            <div className="mb-8 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-3">
                {book.judul}
              </h1>

              <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600">
                <Package size={20} className="text-gray-400" />
                <span className="font-medium">Stok:</span>
                <span className="font-bold text-gray-800">{book.stok}</span>
              </div>
            </div>

            <hr className="border-gray-200 mb-8" />

            {/* 2. Grid Meta Data */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12 mb-10">
              {/* STATUS */}
              <div className="flex items-center gap-3">
                {book.status === 'tersedia' ? (
                  <CheckCircle size={20} className="text-green-500 shrink-0" />
                ) : (
                  <XCircle size={20} className="text-red-500 shrink-0" />
                )}
                <span
                  className={`font-bold uppercase px-3 py-1 rounded text-sm ${
                    book.status === 'tersedia'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  Status: {book.status}
                </span>
              </div>

              {/* 2. 🔥 HARGA (ITEM BARU) */}
              <div className="flex items-center gap-3">
                <DollarSign size={20} className="text-gray-400 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-gray-700 font-medium">
                    Harga Buku Satuan: {formatRupiah(book.harga)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Building size={20} className="text-gray-400 shrink-0" />
                <span className="text-gray-700 font-medium">
                  Penerbit: {book.penerbit || '-'}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <User size={20} className="text-gray-400 shrink-0" />
                <span className="text-gray-700 font-medium">
                  Penulis: {book.penulis || '-'}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Tag size={20} className="text-gray-400 shrink-0" />
                <span className="text-gray-700 font-medium">
                  Kategori: {book.kategori_nama}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Hash size={20} className="text-gray-400 shrink-0" />
                <span className="text-gray-700 font-medium">
                  ISBN: {book.isbn || '-'}
                </span>
              </div>
            </div>

            <hr className="border-gray-200 mb-8" />

            {/* 3. Sinopsis */}
            <div>
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-lg">
                <FileText size={20} className="text-blue-600" />
                Deskripsi
              </h3>
              <div className="text-gray-600 leading-relaxed text-justify space-y-4">
                {book.deskripsi ? (
                  book.deskripsi
                    .split('\n')
                    .map((paragraph, idx) => <p key={idx}>{paragraph}</p>)
                ) : (
                  <p className="italic text-gray-400">
                    Belum ada sinopsis untuk buku ini.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION REKOMENDASI */}
        <div className="mt-20 pt-10 border-t border-gray-100">
          <RecommendationSection
            recommendations={recommendations}
            getImageUrl={getImageUrl}
          />
        </div>
      </div>

      {/* MODAL BOOKING */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bookTitle={book?.judul}
        onSubmit={handleSubmitBooking}
        stokTersedia={book?.stok}
      />
    </Layout>
  )
}

export default BookDetail
