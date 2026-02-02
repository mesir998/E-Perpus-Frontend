const MuridTableHeader = () => {
  return (
    // 👇 LOGIC: text-xs (HP), md:text-sm (Laptop)
    <thead className="bg-gray-100 text-gray-700 uppercase font-bold text-xs md:text-sm">
      <tr>
        {/* ✅ 1. FOTO */}
        {/* Mobile: w-12 px-2 | Desktop: w-16 px-3 */}
        <th className="border px-2 py-2 md:px-3 text-center w-12 md:w-16">
          Foto
        </th>

        {/* ✅ 2. NAMA */}
        <th className="border px-2 py-2 md:px-3 text-left">Nama Murid</th>

        {/* ❌ 3. NIS (Sembunyi di HP) */}
        <th className="border px-2 py-2 md:px-3 text-left hidden md:table-cell">
          NIS
        </th>

        {/* ❌ 4. KELAS (Sembunyi di HP) */}
        <th className="border px-2 py-2 md:px-3 text-left w-24 hidden md:table-cell">
          Kelas
        </th>

        {/* ❌ 5. JURUSAN (Sembunyi di HP) */}
        <th className="border px-2 py-2 md:px-3 text-left hidden md:table-cell">
          Jurusan
        </th>

        {/* ❌ 6. STATUS (Sembunyi di HP) */}
        <th className="border px-2 py-2 md:px-3 text-center hidden md:table-cell">
          Status
        </th>

        {/* ✅ 7. AKSI */}
        <th className="border px-2 py-2 md:px-3 text-center">Aksi</th>
      </tr>
    </thead>
  )
}

export default MuridTableHeader
