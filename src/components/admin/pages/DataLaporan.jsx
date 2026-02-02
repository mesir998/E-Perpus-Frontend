import PaginationControls from '../layouts/PaginationControls'
import useDataLaporan from '../../../hooks/useDataLaporan'
import LaporanHeader from '../components/laporan/LaporanHeader'
import LaporanFilter from '../components/laporan/LaporanFilter'
import LaporanTable from '../components/laporan/LaporanTable'
import LaporanDetailModal from '../components/laporan/LaporanDetailModal'

function DataLaporan() {
  const {
    laporan,
    filteredData,
    loading,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    statusFilter,
    setStatusFilter,
    search,
    setSearch,
    currentPage,
    totalPages,
    totalItems,
    startIndex,
    endIndex,
    paginatedData,
    handlePrevPage,
    handleNextPage,
    selectedItem,
    setSelectedItem,
    getStatusBadge,
    handlePrintPDF,
    handleExportCSV,
  } = useDataLaporan()

  return (
    <>
      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        {/* 1. Header - Berikan props onExport dan onExportCSV */}
        <LaporanHeader
          onExport={handlePrintPDF}
          onExportCSV={handleExportCSV}
        />

        {/* 2. Filter */}
        <LaporanFilter
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          search={search}
          setSearch={setSearch}
        />

        {/* 3. Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <LaporanTable
            loading={loading}
            data={paginatedData}
            onViewDetail={setSelectedItem}
            getStatusBadge={getStatusBadge}
          />

          {/* Pagination Controls */}
          {!loading && filteredData.length > 0 && (
            <div className="p-4 border-t border-gray-100">
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                startIndex={startIndex}
                endIndex={endIndex}
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
                originalTotalItems={laporan.length}
                isFiltered={filteredData.length !== laporan.length}
                dataType={'laporan'}
              />
            </div>
          )}
        </div>
      </div>

      {/* 4. Modal */}
      <LaporanDetailModal
        data={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </>
  )
}

export default DataLaporan
