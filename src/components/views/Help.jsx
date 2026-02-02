import { useState } from 'react' // Jangan lupa import useState
import Layout from '../Layout'
import { ChevronDown } from 'lucide-react'
import Typewriter from 'typewriter-effect'

function Help() {
  // State buat nyimpen index mana yang lagi kebuka
  // null artinya ga ada yang kebuka
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    // Kalo yang diklik itu udah kebuka, tutup (set jadi null).
    // Kalo belum, set jadi index tersebut (otomatis yang lain ketutup).
    setOpenIndex(openIndex === index ? null : index)
  }

  const faqList = [
    {
      question: 'Bagaimana cara meminjam buku?',
      answer:
        "Anda perlu mendaftar (Sign Up) dan Login terlebih dahulu. Setelah masuk, pilih buku yang diinginkan di halaman Book lalu lihat detail dan klik tombol 'Booking'.",
    },
    {
      question: 'Berapa lama batas peminjaman buku?',
      answer:
        'Batas peminjaman buku adalah 7 hari. Jika melebihi batas waktu, akan dikenakan denda sesuai peraturan.',
    },
    {
      question: 'Bagaimana jika buku yang saya pinjam hilang?',
      answer:
        'Siswa wajib mengganti buku yang sama persis atau membayar denda sesuai harga buku tersebut.',
    },
    {
      question: 'Apakah bisa meminjam buku lebih dari 3?',
      answer: 'Tidak, Batas maksimal peminjaman buku hanya 3 kali peminjaman.',
    },
    {
      question: 'Jam berapa perpustakaan buka?',
      answer:
        'Kami buka setiap hari Senin - Jumat, mulai pukul 08.00 WIB sampai 16.00 WIB.',
    },
  ]

  return (
    <Layout>
      <div className="bg-white min-h-screen font-sans text-slate-900 flex flex-col items-center pt-8 md:pt-12">
        <div className="container px-6 max-w-3xl">
          {/* Judul */}
          <div className="text-center mb-8 h-20 flex items-center justify-center">
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight mb-2 text-slate-900">
              <Typewriter
                options={{
                  strings: [
                    'Hai, Ada yang bisa kami bantu ?',
                    'Cari jawabanmu di sini.',
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 75,
                  deleteSpeed: 50,
                }}
              />
            </h1>
          </div>

          {/* List Pertanyaan (Accordion Logic) */}
          <div className="space-y-4">
            {faqList.map((item, index) => {
              // Cek apakah item ini lagi kebuka
              const isOpen = openIndex === index

              return (
                <div
                  key={index}
                  className="border-2 border-black rounded-sm overflow-hidden bg-white transition-all duration-200"
                >
                  {/* Bagian Header (Pertanyaan) - Ganti summary jadi button/div */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-center p-4 md:p-5 text-left bg-white hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-base md:text-lg font-bold pr-4">
                      {item.question}
                    </span>
                    {/* Rotasi panah dikontrol manual pake state */}
                    <ChevronDown
                      size={24}
                      className={`text-black transition-transform duration-300 min-w-[24px] ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Bagian Isi (Jawaban) - Muncul cuma kalo isOpen true */}
                  {isOpen && (
                    <div className="px-5 pb-5 text-gray-700 leading-relaxed font-medium text-sm md:text-base animate-in slide-in-from-top-2 duration-200">
                      <div className="border-t-2 border-dashed border-gray-300 pt-4">
                        {item.answer}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Help
