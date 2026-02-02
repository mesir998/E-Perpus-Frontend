// 📂 src/hooks/usePagination.js
import { useState, useEffect, useMemo } from 'react'

export const usePagination = (data, itemsPerPage = 10, resetTrigger = null) => {
  const [currentPage, setCurrentPage] = useState(1)

  // 🔥 useEffect pindah ke sini
  // Fungsinya: Reset ke halaman 1 kalau trigger (misal: modal show) berubah jadi true
  useEffect(() => {
    if (resetTrigger) {
      setCurrentPage(1)
    }
  }, [resetTrigger])

  // Hitung Total Halaman
  const totalPages = Math.ceil(data.length / itemsPerPage)

  // Potong Data (Slice)
  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return data.slice(startIndex, startIndex + itemsPerPage)
  }, [data, currentPage, itemsPerPage])

  return {
    currentPage,
    setCurrentPage, // Buat tombol next/prev
    totalPages,
    currentData,
  }
}
