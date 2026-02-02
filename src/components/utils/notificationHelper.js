// 📂 src/utils/notificationHelper.js

export const parseMessage = (msg) => {
  if (!msg) return { body: 'Pesan kosong.', title: 'Info', type: 'info' }
  try {
    return JSON.parse(msg)
  } catch (e) {
    return { body: msg, title: 'Info', isLegacy: true }
  }
}

export const getNotificationStyle = (type) => {
  switch (type) {
    case 'booking':
      return { icon: '📩', title: '📚 Booking Baru' }
    case 'success':
      return { icon: '✅', title: 'Berhasil' }
    case 'error':
      return { icon: '❌', title: 'Gagal' }
    case 'info':
    default:
      return { icon: '📢', title: 'Informasi' }
  }
}
