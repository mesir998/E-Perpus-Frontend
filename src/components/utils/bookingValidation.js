import moment from 'moment'
import axios from 'axios'
import Swal from 'sweetalert2'

export const validateBookingTime = async () => {
  const sekarang = moment()
  const jam = sekarang.hour()
  const hariIni = sekarang.day()
  const tglFormat = sekarang.format('YYYY-MM-DD')

  // 1. Validasi Jam Operasional (08:00 - 16:00)
  if (jam < 8 || jam >= 16) {
    await Swal.fire({
      icon: 'error',
      title: 'Perpustakaan Tutup',
      text: `Booking hanya bisa dilakukan pukul 08:00 - 16:00. Sekarang jam ${sekarang.format('HH:mm')}.`,
      confirmButtonColor: '#2563eb',
    })
    return false
  }

  // 2. Validasi Hari Sabtu & Minggu
  if (hariIni === 0 || hariIni === 6) {
    await Swal.fire({
      icon: 'warning',
      title: 'Hari Libur',
      text: 'Maaf, perpustakaan libur pada hari Sabtu dan Minggu.',
      confirmButtonColor: '#2563eb',
    })
    return false
  }

  // 3. Cek Libur Nasional
  try {
    // Penulisan axios yang bener nih Bre
    const resLibur = await axios.get('https://dayoffapi.vercel.app/api', {
      timeout: 2000,
    })

    const liburNasional = resLibur.data.find(
      (item) => item.tanggal === tglFormat
    )

    if (liburNasional) {
      await Swal.fire({
        icon: 'info',
        title: 'Libur Nasional',
        text: `Hari ini perpus tutup karena: ${liburNasional.keterangan}`,
        confirmButtonColor: '#2563eb',
      })
      return false
    }
  } catch (err) {
    // Kalau API timeout atau mati, kita biarkan user lewat (bypass)
    console.warn('Skip cek libur nasional karena API bermasalah atau timeout')
  }

  return true
}
