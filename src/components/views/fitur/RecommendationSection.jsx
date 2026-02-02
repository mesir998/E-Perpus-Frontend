import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Layers, ChevronLeft, ChevronRight } from 'lucide-react'
import Typewriter from 'typewriter-effect'

const RecommendationSection = ({ recommendations, getImageUrl }) => {
  const location = useLocation()

  // 1. State untuk pagination (Carousel)
  const [startIndex, setStartIndex] = useState(0)
  const itemsPerPage = 5 // Jumlah buku yang muncul per slide

  // 2. Logic Base Path (Cek apakah user Murid atau Guest)
  const basePath = location.pathname.startsWith('/murid')
    ? '/murid/book/detailbook'
    : '/book/detailbook'

  // ==========================================
  // 3. LOGIC HANDLER NEXT & PREV (SUDAH DIPERBAIKI)
  // Sekarang gesernya per 'itemsPerPage' (5 buku), bukan +1
  // ==========================================

  const handleNext = () => {
    // Cek apakah masih ada sisa buku di halaman berikutnya
    if (startIndex + itemsPerPage < recommendations.length) {
      setStartIndex((prev) => prev + itemsPerPage)
    }
  }

  const handlePrev = () => {
    // Geser mundur 5 buku, pakai Math.max biar gak minus
    if (startIndex > 0) {
      setStartIndex((prev) => Math.max(0, prev - itemsPerPage))
    }
  }

  // 4. Potong data sesuai posisi slide saat ini
  const visibleRecommendations = recommendations.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  // Cek kondisi tombol disable
  const isPrevDisabled = startIndex === 0
  const isNextDisabled = startIndex + itemsPerPage >= recommendations.length

  // Render jika tidak ada data
  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="max-w-5xl mx-auto border-t pt-10 mt-12 text-center text-gray-400 italic">
        Tidak ada buku terkait yang ditemukan.
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto border-t pt-10 mt-12">
      {/* HEADER: JUDUL & TOMBOL NAVIGASI */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="flex items-center gap-2 text-xl font-bold text-gray-800">
          <Layers className="text-blue-600" size={24} />
          <span className="text-gray-800">
            <Typewriter
              options={{
                strings: ['Rekomendasi Buku'],
                autoStart: true,
                loop: true,
                delay: 75,
                deleteSpeed: 50,
              }}
            />
          </span>
        </h3>

        {/* TOMBOL NEXT / PREV (Hanya muncul jika buku > 5) */}
        {recommendations.length > itemsPerPage && (
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              disabled={isPrevDisabled}
              className={`p-2 rounded-full border transition-all ${
                isPrevDisabled
                  ? 'text-gray-300 border-gray-200 cursor-not-allowed'
                  : 'text-gray-600 border-gray-300 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-400 shadow-sm'
              }`}
              title="Halaman Sebelumnya"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={handleNext}
              disabled={isNextDisabled}
              className={`p-2 rounded-full border transition-all ${
                isNextDisabled
                  ? 'text-gray-300 border-gray-200 cursor-not-allowed'
                  : 'text-gray-600 border-gray-300 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-400 shadow-sm'
              }`}
              title="Halaman Berikutnya"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      {/* GRID BUKU */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {visibleRecommendations.map((item) => (
          <Link
            to={`${basePath}/${item.id}`}
            key={item.id}
            className="group flex flex-col bg-white rounded-lg border hover:shadow-lg transition-all duration-300 h-full"
          >
            {/* Cover Image */}
            <div className="overflow-hidden rounded-t-lg h-48 relative bg-gray-100">
              <img
                src={
                  item.cover
                    ? getImageUrl(item.cover)
                    : '/assets/default-book.png'
                }
                alt={item.judul}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              {/* Badge Match Score */}
              {item.similarity_score && (
                <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm">
                  {Math.round(item.similarity_score * 100)}% Match
                </div>
              )}
            </div>

            {/* Info Buku */}
            <div className="p-3 flex-1 flex flex-col text-left">
              <h4 className="text-sm font-bold line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
                {item.judul}
              </h4>
              <p className="text-xs text-gray-500 mt-auto mb-2 line-clamp-1">
                {item.penulis}
              </p>

              <div className="mt-auto">
                <span className="px-2 py-1 bg-blue-50 text-[10px] font-medium text-blue-600 rounded-full inline-block">
                  {item.kategori?.nama_kategori}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default RecommendationSection
