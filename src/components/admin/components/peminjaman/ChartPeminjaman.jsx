import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useChartPeminjaman } from '../../../../hooks/useChartPeminjaman' // Sesuaikan path

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const ChartPeminjaman = () => {
  // Panggil Logic dari Hook
  const {
    chartData,
    loading,
    totalPeminjaman,
    selectedYear,
    setSelectedYear,
    yearOptions,
    options,
    chartRef,
  } = useChartPeminjaman()

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
      {/* HEADER */}
      <div className="flex justify-between items-start mb-4 sm:mb-8">
        <div>
          <h3 className="text-lg font-bold text-gray-800 tracking-tight">
            Statistik Peminjaman
          </h3>
          <div className="flex items-center mt-1 gap-2">
            <span className="text-sm text-gray-500 hidden xs:inline">
              Total tahun ini:
            </span>
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
              {loading ? '...' : totalPeminjaman}{' '}
              <span className="hidden sm:inline">Murid Yang Meminjam Buku</span>
              <span className="sm:hidden">Peminjam</span>
            </span>
          </div>
        </div>

        {/* Dropdown */}
        <div className="relative">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-1.5 sm:py-2 px-3 sm:px-4 pr-8 sm:pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm font-medium cursor-pointer transition-all hover:bg-gray-100"
          >
            {yearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          {/* Icon Chevron (Sederhanakan kalau mau) */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      {/* CHART */}
      <div className="relative w-full h-[250px] sm:h-[350px] md:h-[400px] pb-2 sm:pb-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-xs text-gray-400">Sedang memuat data...</p>
          </div>
        ) : (
          <Bar ref={chartRef} options={options} data={chartData} />
        )}
      </div>
    </div>
  )
}

export default ChartPeminjaman
