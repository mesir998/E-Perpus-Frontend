import PropTypes from 'prop-types'
import { Search } from 'lucide-react'

function SearchInputBook({ searchTerm, setSearchTerm }) {
  return (
    <div className="relative w-full md:flex-1">
      {/* Ikon Search: Berubah warna jadi biru pas input difokus */}
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
      </div>

      {/* Input Field: Rounded Full, Background Abu Muda */}
      <input
        type="text"
        id="search"
        name="search"
        autoComplete="off"
        className="block w-full pl-11 pr-5 py-3 bg-gray-50 border border-transparent rounded-full leading-5 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm group-hover:bg-white group-hover:shadow-md"
        placeholder="Cari judul, penulis, status, atau penerbit..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  )
}

SearchInputBook.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
}

export default SearchInputBook
