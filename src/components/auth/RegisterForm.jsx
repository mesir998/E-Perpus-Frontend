// 📂 src/components/auth/RegisterForm.jsx
import { Link } from 'react-router-dom'
import FormInput from '../forms/FormInput'
import FormSelect from '../forms/FormSelect'
import PasswordInput from '../forms/PasswordInput'
import FormTextarea from '../forms/FormTextArea'

// Options statis
const kelasOptions = ['X', 'XI', 'XII']
const jurusanOptions = ['IPA', 'IPS']
const genderOptions = ['Laki-laki', 'Perempuan']

export default function RegisterForm({
  register,
  errors,
  loading,
  onSubmit,
  selectedKelas,
  handleKelasChange,
  handleSubmit, // Perlu dipassing dari hook
}) {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"
    >
      {/* --- KOLOM KIRI --- */}
      <div className="space-y-3">
        <FormInput
          label="Nama Lengkap"
          {...register('namaLengkap')}
          placeholder="Masukkan nama lengkap Anda"
          error={errors.namaLengkap?.message}
        />
        <FormInput
          label="NIS"
          type="tel"
          onlyNumber
          {...register('nis')}
          placeholder="Masukkan NIS Anda"
          error={errors.nis?.message}
        />

        {/* Dropdown Kelas dengan Custom Handler */}
        <FormSelect
          label="Kelas"
          options={kelasOptions}
          {...register('kelas')}
          onChange={(e) => {
            register('kelas').onChange(e) // Panggil bawaan react-hook-form
            handleKelasChange(e) // Panggil custom logic kita
          }}
          error={errors.kelas?.message}
        />

        {/* Kondisional Jurusan (Hanya muncul jika BUKAN kelas X) */}
        {selectedKelas !== 'X' && selectedKelas !== '' && (
          <FormSelect
            label="Jurusan"
            options={jurusanOptions}
            {...register('jurusan')}
            error={errors.jurusan?.message}
          />
        )}

        <FormSelect
          label="Jenis Kelamin"
          options={genderOptions}
          {...register('jenis_kelamin')}
          error={errors.jenis_kelamin?.message}
        />

        {/* Alamat (Posisi Kiri jika Kelas X) */}
        {(selectedKelas === 'X' || selectedKelas === '') && (
          <div className="transition-all duration-300">
            <FormTextarea
              label="Alamat Rumah"
              {...register('alamat')}
              placeholder="Masukkan alamat lengkap Anda"
              autoComplete="off"
              rows={3}
              error={errors.alamat?.message}
            />
          </div>
        )}
      </div>

      {/* --- KOLOM KANAN --- */}
      <div className="space-y-3">
        <FormInput
          label="Nomor Telepon"
          type="tel"
          onlyNumber
          {...register('telepon')}
          placeholder="Masukkan nomor telepon aktif Anda"
          autoComplete="off"
          error={errors.telepon?.message}
        />
        <FormInput
          label="Email"
          type="email"
          {...register('email')}
          placeholder="Masukkan email aktif Anda"
          autoComplete="off"
          error={errors.email?.message}
        />
        <PasswordInput
          label="Password"
          {...register('password')}
          placeholder="Masukkan password Anda"
          autoComplete="new-password"
          error={errors.password?.message}
        />
        <PasswordInput
          label="Konfirmasi Password"
          {...register('konfirmasiPassword')}
          placeholder="Konfirmasi password Anda"
          autoComplete="new-password"
          error={errors.konfirmasiPassword?.message}
        />

        {/* Alamat (Posisi Kanan jika Kelas XI/XII) */}
        {selectedKelas !== 'X' && selectedKelas !== '' && (
          <div className="transition-all duration-300">
            <FormTextarea
              label="Alamat Rumah"
              {...register('alamat')}
              placeholder="Masukkan alamat lengkap Anda"
              autoComplete="off"
              rows={3}
              error={errors.alamat?.message}
            />
          </div>
        )}
      </div>

      {/* --- TOMBOL SUBMIT --- */}
      <div className="md:col-span-2 mt-4">
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white px-4 py-3 rounded-md text-sm sm:text-base font-medium transition duration-200 ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
          }`}
        >
          {loading ? 'Mendaftar...' : 'Register'}
        </button>

        <p className="mt-3 text-center text-gray-600 text-sm">
          Sudah punya akun?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </form>
  )
}
