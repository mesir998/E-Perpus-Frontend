import { useState, useRef, useEffect } from 'react'
import { XCircle, BookX, BookOpen } from 'lucide-react'
import Typewriter from 'typewriter-effect'

// Import Components & Hooks
import Layout from '../Layout'
import SearchInput from './fitur/SearchInputBook'
import KategoriDropdown from './fitur/KategoriDropdown'
import BookCard from './fitur/BookCard'
import BookLoader from '../../components/shared/BookLoader'
import { useBooks } from '../../hooks/useBooks'

// 1. IMPORT KOMPONEN PAGINATION
// (Pastikan path import ini sesuai dengan struktur folder lu ya)
import PaginationControls from '../admin/layouts/PaginationControls'

function Book() {
  // 1. Panggil Logic dari Hook (Data Layer)
  const { books, kategoriList, loading } = useBooks()

  // 2. State Lokal untuk UI (Filter/Search Layer)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedKategori, setSelectedKategori] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)

  // --- BAGIAN BARU: STATE PAGINATION ---
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8 // <-- Sesuai request, ganti jadi 8
  // -------------------------------------

  // Dropdown click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // --- LOGIC RESET HALAMAN ---
  // Kalau user cari buku atau ganti kategori, wajib balik ke halaman 1
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedKategori])

  // Filter Logic
  const filteredBooks = books.filter((buku) => {
    const term = searchTerm.toLowerCase()
    const matchSearch =
      (buku.judul && buku.judul.toLowerCase().includes(term)) ||
      (buku.penulis && buku.penulis.toLowerCase().includes(term)) ||
      (buku.penerbit && buku.penerbit.toLowerCase().includes(term)) ||
      (buku.tahun_terbit && buku.tahun_terbit.toString().includes(term)) ||
      (buku.status && buku.status.toString().toLowerCase().includes(term))

    const matchKategori = selectedKategori
      ? buku.kategori_id === parseInt(selectedKategori)
      : true

    return matchSearch && matchKategori
  })

  // --- LOGIC PEMBAGIAN DATA (SLICING) ---
  const indexOfLastBook = currentPage * itemsPerPage
  const indexOfFirstBook = indexOfLastBook - itemsPerPage

  // currentBooks = Data yang tampil di layar (maksimal 8)
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook)

  // Hitung total halaman
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage)

  // Handler tombol Next / Prev
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  // Render Loader jika loading
  if (loading) {
    return (
      <Layout>
        <BookLoader />
      </Layout>
    )
  }

  // Main Render
  return (
    <Layout>
      <div className="p-4 sm:p-6 max-w-7xl mx-auto flex flex-col min-h-screen">
        {/* JUDUL */}
        <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-700 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-slate-900" />
          </div>
          <span className="text-slate-900 min-w-[200px] text-center md:text-left">
            <Typewriter
              options={{
                strings: ['Daftar Buku'],
                autoStart: true,
                loop: true,
                delay: 75,
                deleteSpeed: 50,
              }}
            />
          </span>
        </h1>

        {/* CONTROLS (SEARCH & FILTER) */}
        <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md p-4 -mx-4 sm:mx-0 rounded-2xl border border-gray-100 shadow-sm mb-8 transition-all">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <SearchInput
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />

            <div className="flex items-center gap-3 w-full md:w-auto">
              <KategoriDropdown
                ref={dropdownRef}
                kategoriList={kategoriList}
                selectedKategori={selectedKategori}
                setSelectedKategori={setSelectedKategori}
                showDropdown={showDropdown}
                setShowDropdown={setShowDropdown}
              />

              {(selectedKategori || searchTerm) && (
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedKategori('')
                  }}
                  className="p-3 rounded-full border border-red-100 text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors shadow-sm"
                  title="Reset Filter"
                >
                  <XCircle size={20} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* BOOK LIST */}
        <div className="flex-grow">
          {filteredBooks.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-20 text-gray-500">
              <BookX size={48} className="mb-2 text-gray-400" />
              <p className="text-sm italic">Tidak ada buku yang ditemukan.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mb-8">
              {/* RENDER currentBooks (yang isinya max 8), BUKAN filteredBooks */}
              {currentBooks.map((buku) => (
                <BookCard
                  key={buku.id}
                  buku={buku}
                  kategoriList={kategoriList}
                />
              ))}
            </div>
          )}
        </div>

        {/* 3. COMPONENT PAGINATION */}
        <div className="mt-auto pt-6">
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredBooks.length}
            startIndex={indexOfFirstBook}
            endIndex={indexOfLastBook}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
            originalTotalItems={books.length}
            isFiltered={filteredBooks.length !== books.length}
            dataType="buku"
          />
        </div>
      </div>
    </Layout>
  )
}

export default Book
