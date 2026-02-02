import { Upload } from 'lucide-react'
import { ProfileInput, ProfileDisplay, ProfileFileInput } from './ProfileInput'

export default function AdminProfileView({
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
  // handleBack (Opsional kalau admin mau ada tombol back)
}) {
  return (
    // UBAHAN DISINI: ganti max-w-6xl mx-auto jadi w-full
    <div className="w-full p-4 md:p-8 font-sans">
      {/* CARD 1: INFORMASI AKUN (DESIGN ORIGINAL ADMIN) */}
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-lg mb-8">
        <div className="p-4 text-white font-bold text-xl rounded-t-lg bg-teal-600">
          Profil Saya (Admin)
        </div>

        <form
          onSubmit={handleProfileUpdate}
          className="p-6 md:p-8 flex flex-col md:flex-row gap-8"
          encType="multipart/form-data"
        >
          {/* KIRI: FOTO & UPLOAD CONTROL */}
          <div className="w-full md:w-1/3 flex flex-col items-center justify-start border-b md:border-b-0 md:border-r dark:border-gray-700 md:pr-6 pb-6 md:pb-0">
            <ProfileFileInput
              selectedFile={selectedFile}
              previewUrl={previewUrl}
              fileInputRef={fileInputRef}
              handleFileChange={handleFileChange}
              isEditing={isEditing}
            />

            <div className="text-center pt-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {user.namaLengkap}
              </h3>
              <p className="text-sm text-gray-500 mb-4">{user.email}</p>
            </div>

            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className={`w-full px-4 py-2 font-semibold rounded transition ${
                isEditing
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-green-600 hover:bg-green-700'
              } text-white`}
              disabled={updateLoading}
            >
              {isEditing ? 'Batalkan Edit' : 'Edit Profil'}
            </button>
            {isEditing && (
              <button
                type="submit"
                className="w-full mt-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
                disabled={updateLoading}
              >
                {updateLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            )}
          </div>

          {/* KANAN: FORM INPUTS */}
          <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <h4 className="md:col-span-2 text-lg font-bold border-b pb-2 mb-2 dark:text-gray-200">
              Informasi Akun
            </h4>

            <ProfileInput
              label="Nama Lengkap"
              name="namaLengkap"
              value={profileForm.namaLengkap}
              onChange={(e) =>
                setProfileForm({ ...profileForm, namaLengkap: e.target.value })
              }
              disabled={!isEditing}
            />
            <ProfileInput
              label="Email Address"
              name="email"
              type="email"
              value={user.email}
              disabled={true}
            />
            <ProfileInput
              label="Nomor Telepon"
              name="telepon"
              value={profileForm.telepon}
              onChange={(e) =>
                setProfileForm({ ...profileForm, telepon: e.target.value })
              }
              disabled={!isEditing}
            />
            <ProfileInput
              label="Alamat (Rumah)"
              name="alamat"
              isTextArea={true}
              value={profileForm.alamat}
              onChange={(e) =>
                setProfileForm({ ...profileForm, alamat: e.target.value })
              }
              disabled={!isEditing}
              className="md:col-span-2"
            />

            {/* INFO ROLE ADMIN */}
            <div className="md:col-span-2 mt-4 pt-4 border-t border-gray-100">
              <ProfileDisplay label="Role Akses" value="Admin Perpustakaan" />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
