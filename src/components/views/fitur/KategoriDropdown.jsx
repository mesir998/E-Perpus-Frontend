import PropTypes from 'prop-types'
import { forwardRef } from 'react'
import { ChevronDown, Layers, Check } from 'lucide-react' // Pastikan import ini

const KategoriDropdown = forwardRef(function KategoriDropdown(
  {
    kategoriList,
    selectedKategori,
    setSelectedKategori,
    showDropdown,
    setShowDropdown,
  },
  ref
) {
  // Helper: Cari nama kategori yang sedang dipilih
  const selectedLabel = selectedKategori
    ? kategoriList.find((k) => k.id === parseInt(selectedKategori))
        ?.nama_kategori
    : 'Semua Kategori'

  return (
    <div className="relative w-full md:w-64" ref={ref}>
      <button
        type="button"
        onClick={() => setShowDropdown(!showDropdown)}
        className={`w-full flex items-center justify-between px-5 py-3 border rounded-full shadow-sm transition-all duration-200
          ${
            showDropdown || selectedKategori
              ? 'bg-blue-50 border-blue-500 text-blue-700 ring-2 ring-blue-200'
              : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
          }`}
      >
        <span className="flex items-center gap-2 font-medium truncate">
          <Layers
            size={18}
            className={selectedKategori ? 'text-blue-600' : 'text-gray-400'}
          />
          {selectedLabel}
        </span>
        <ChevronDown
          size={18}
          className={`transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Menu Dropdown */}
      {showDropdown && (
        <div className="absolute z-20 mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top-left">
          <ul className="max-h-60 overflow-y-auto py-2">
            <li>
              <button
                onClick={() => {
                  setSelectedKategori('')
                  setShowDropdown(false)
                }}
                className="w-full text-left px-4 py-2.5 hover:bg-blue-50 text-sm font-medium text-gray-600 hover:text-blue-600 flex items-center gap-2 transition-colors"
              >
                {/* Indikator bulat kosong/isi */}
                <div
                  className={`w-2 h-2 rounded-full ${!selectedKategori ? 'bg-blue-500' : 'bg-gray-300'}`}
                ></div>
                Semua Kategori
              </button>
            </li>
            {kategoriList.map((kategori) => (
              <li key={kategori.id}>
                <button
                  onClick={() => {
                    setSelectedKategori(kategori.id)
                    setShowDropdown(false)
                  }}
                  className={`w-full text-left px-4 py-2.5 hover:bg-blue-50 text-sm font-medium flex items-center gap-2 transition-colors
                    ${selectedKategori === kategori.id ? 'text-blue-700 bg-blue-50' : 'text-gray-700'}`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${selectedKategori === kategori.id ? 'bg-blue-500' : 'bg-gray-300'}`}
                  ></div>
                  {kategori.nama_kategori}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
})

KategoriDropdown.propTypes = {
  kategoriList: PropTypes.array.isRequired,
  selectedKategori: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  setSelectedKategori: PropTypes.func.isRequired,
  showDropdown: PropTypes.bool.isRequired,
  setShowDropdown: PropTypes.func.isRequired,
}

export default KategoriDropdown
