import React from 'react'

const BookLoader = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
      <style>{`
        .book-loader {
          --b: 26px; --c: #2563eb; --w: #f8fafc;
          width: 32px; height: 14px; background: var(--c);
          border-radius: 50% 50% 0 0 / 100% 100% 0 0;
          position: relative; transform-origin: 50% 100%;
          animation: book-bounce 0.5s alternate infinite ease-in-out;
          box-shadow: 0 10px 20px rgba(37, 99, 235, 0.2);
        }
        .book-loader:before {
          content: ""; position: absolute; inset: 0;
          border-radius: 50% 50% 0 0 / 100% 100% 0 0;
          background: linear-gradient(var(--c) 0 0) bottom/100% var(--b) no-repeat,
            linear-gradient(var(--c) 0 0) left/50% 100% no-repeat,
            linear-gradient(to right, var(--w) 50%, var(--c) 50%);
          animation: book-flip 1s infinite linear; transform-origin: 50% 100%;
        }
        @keyframes book-flip { 0% { transform: rotate(0deg) } 50% { transform: rotate(180deg) } 100% { transform: rotate(360deg) } }
        @keyframes book-bounce { 0% { transform: translateY(0) scale(1); } 100% { transform: translateY(-5px) scale(1.1); } }
      `}</style>

      <div className="relative">
        <div className="book-loader"></div>
      </div>
      <p className="text-gray-500 font-medium text-sm animate-pulse tracking-wide">
        Sedang menyiapkan buku...
      </p>
    </div>
  )
}

export default BookLoader
