import { ArrowLeft, User, BookOpen, Upload } from 'lucide-react'
import { ProfileInput } from './ProfileInput'

export default function MuridProfileView({
  user,
  profileForm,
  setProfileForm,
  handleProfileUpdate,
  handleFileChange,
  fileInputRef,
  selectedFile,
  previewUrl,
  isEditing,
  setIsEditing,
  updateLoading,
  handleBack,
}) {
  // --- STYLE KHUSUS UNTUK DATA AKADEMIK (BOX GELAP) ---
  const academicInputClass =
    'w-full mt-1 p-3 bg-slate-500 text-white rounded-md border-none font-medium'
  const academicLabelClass = 'block text-sm font-semibold text-gray-500 mb-1'

  return (
    <div className="w-full min-h-screen p-4 md:p-8">
      {/* 1. TOMBOL KEMBALI */}
      <div className="mb-6 flex justify-between items-center">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition font-medium px-4 py-2 rounded-lg hover:bg-white hover:shadow-sm"
        >
          <ArrowLeft size={20} /> Kembali ke Home
        </button>
      </div>

      {/* 2. HEADER PROFILE CARD (DESIGN KHUSUS MURID) */}
      {/* Hapus 'relative' dan 'overflow-hidden' kalau mau lebih clean lagi, tapi dibiarin juga gak apa-apa */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-2xl shadow-xl mb-8">
        {/* BAGIAN IKON BUKU DAH DIHAPUS DI SINI */}

        <div className="p-8 flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Foto Profil */}
          <div className="relative group shrink-0">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-white/30 backdrop-blur-md">
              <img
                src={previewUrl || '/assets/default-profile.png'}
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
              />
            </div>

            {/* Tombol Upload (Hanya Muncul saat Edit) */}
            {isEditing && (
              <>
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="absolute bottom-2 right-2 bg-white text-indigo-600 p-2 rounded-full shadow-lg hover:bg-gray-100 transition transform hover:scale-110"
                  title="Ganti Foto"
                >
                  <Upload size={20} />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </>
            )}
          </div>

          {/* Info Utama */}
          <div className="text-center md:text-left text-white flex-1">
            <h1 className="text-3xl font-bold mb-2">{user.namaLengkap}</h1>
            <p className="text-indigo-100 text-lg flex items-center justify-center md:justify-start gap-2 mb-4">
              {user.nis} • Kelas {user.kelas} {user.jurusan}
            </p>
            <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md border border-white/40 shadow-sm">
              Status: {user.status}
            </span>
          </div>

          {/* Tombol Edit Profil */}
          <div className="md:self-start">
            <button
              type="button"
              onClick={() => {
                setIsEditing(!isEditing)
                // Jika batal edit, file yang dipilih harusnya direset di parent (optional logic)
              }}
              className={`px-6 py-2.5 rounded-xl font-bold shadow-lg transition transform hover:-translate-y-1 ${
                isEditing
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-white text-indigo-600 hover:bg-gray-50'
              }`}
            >
              {isEditing ? 'Batalkan Edit' : 'Edit Profil'}
            </button>
          </div>
        </div>
      </div>

      {/* 3. GRID CONTENT */}
      <form
        onSubmit={handleProfileUpdate}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {/* KOLOM KIRI: FORM EDIT (Input Standar Putih) */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2 border-b pb-4">
            <User className="text-indigo-600" /> Informasi Pribadi
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileInput
              label="Nama Lengkap"
              value={profileForm.namaLengkap}
              onChange={(e) =>
                setProfileForm({ ...profileForm, namaLengkap: e.target.value })
              }
              disabled={!isEditing}
            />
            <ProfileInput
              label="Email (Read-only)"
              value={user.email}
              disabled={true}
            />
            <ProfileInput
              label="No. Telepon"
              value={profileForm.telepon}
              onChange={(e) =>
                setProfileForm({ ...profileForm, telepon: e.target.value })
              }
              disabled={!isEditing}
            />
            <ProfileInput
              label="Alamat"
              value={profileForm.alamat}
              onChange={(e) =>
                setProfileForm({ ...profileForm, alamat: e.target.value })
              }
              disabled={!isEditing}
              isTextArea
              className="md:col-span-2"
            />
          </div>

          {isEditing && (
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={updateLoading}
                className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 w-full md:w-auto"
              >
                {updateLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>
          )}
        </div>

        {/* KOLOM KANAN: DATA AKADEMIK (Custom Style Gelap) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-fit sticky top-4">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-4">
            <BookOpen size={20} className="text-indigo-600" /> Data Akademik
          </h3>

          <div className="space-y-4">
            {/* Field NIS */}
            <div>
              <label className={academicLabelClass}>NIS</label>
              <div className={academicInputClass}>{user.nis}</div>
            </div>

            {/* Field Kelas */}
            <div>
              <label className={academicLabelClass}>Kelas</label>
              <div className={academicInputClass}>{user.kelas}</div>
            </div>

            {/* Field Jurusan */}
            <div>
              <label className={academicLabelClass}>Jurusan</label>
              <div className={academicInputClass}>{user.jurusan}</div>
            </div>

            {/* Field Jenis Kelamin (FIXED LOGIC) */}
            <div>
              <label className={academicLabelClass}>Jenis Kelamin</label>
              <div className={academicInputClass}>
                {user.jenis_kelamin &&
                user.jenis_kelamin.toString().toLowerCase().startsWith('l')
                  ? 'Laki-laki'
                  : 'Perempuan'}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
