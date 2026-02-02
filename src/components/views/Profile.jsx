import { useProfile } from '../../hooks/useProfile' // 👈 Import Hook Baru

// IMPORT KOMPONEN UI
import MuridProfileView from '../../components/profiles/MuridProfileView'
import AdminProfileView from '../../components/profiles/AdminProfileView'
import ProfileCardPassword from '../../components/profiles/ProfileCardPassword'

function Profile() {
  // 1. Panggil Logic dari Hook
  const {
    user,
    loading,
    isMurid,
    profileForm,
    setProfileForm,
    passForm,
    setPassForm,
    isEditing,
    setIsEditing,
    updateLoading,
    selectedFile,
    previewUrl,
    handleBack,
    handleFileChange,
    handleProfileUpdate,
    handlePasswordUpdate,
    fileInputRef,
  } = useProfile()

  // 2. Render Loading State
  if (loading)
    return (
      <div className="p-8 text-center text-gray-500 font-medium">
        Memuat data profil...
      </div>
    )
  if (!user)
    return (
      <div className="p-8 text-center text-red-500 font-medium">
        Profil tidak ditemukan.
      </div>
    )

  // 3. Props Shared untuk View
  const commonProps = {
    user,
    profileForm,
    setProfileForm,
    isEditing,
    setIsEditing,
    updateLoading,
    handleBack,
    // File upload logic
    handleFileChange,
    fileInputRef,
    selectedFile,
    previewUrl,
    handleProfileUpdate,
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12 font-sans">
      {/* 🟢 RENDER VIEW SESUAI ROLE */}
      {isMurid ? (
        <MuridProfileView {...commonProps} />
      ) : (
        <AdminProfileView {...commonProps} />
      )}

      {/* 🔐 CARD PASSWORD (Dipisah biar View utama gak kepanjangan) */}
      <div className="w-full px-4 md:px-8 mt-6">
        <ProfileCardPassword
          passForm={passForm}
          setPassForm={setPassForm}
          handlePasswordUpdate={handlePasswordUpdate}
          updateLoading={updateLoading}
          isMurid={isMurid}
        />
      </div>
    </div>
  )
}

export default Profile
