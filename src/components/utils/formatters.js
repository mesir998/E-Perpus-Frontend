// 📂 src/utils/formatters.js
export const formatRp = (value = 0) => {
  const n = Number(value) || 0
  return 'Rp ' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export const formatToYMD = (dateStr) => {
  if (!dateStr) return ''
  try {
    const date = new Date(dateStr)
    return date.toISOString().split('T')[0]
  } catch (e) {
    console.error('Invalid date format:', dateStr)
    return ''
  }
}
