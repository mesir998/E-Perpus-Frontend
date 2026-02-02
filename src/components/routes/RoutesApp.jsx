import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'

// ==== Public & User Pages ====
import Home from '../views/Home'
import Book from '../views/Book'
import Help from '../views/Help'
import Login from '../views/Login'
import Register from '../views/Register'
import Profile from '../views/Profile'
import BookDetail from '../views/pages/BookDetail'
import RiwayatPeminjaman from '../murid/components/pages/RiwayatPeminjaman'
import NotFound from '../views/fitur/NotFound'

// ==== Admin Pages ====
import AdminDashboard from '../admin/AdminDashboard'
import Dashboard from '../admin/pages/Dashboard'
import DataBuku from '../admin/pages/DataBuku'
import FormTambahBuku from '../admin/pages/Form/FormTambahBuku'
import EditBuku from '../admin/pages/Form/FormEditBuku'
import DataEksemplar from '../admin/pages/DataEksemplar'
import FormEditEksemplar from '../admin/pages/Form/FormEditEksemplar'
import DataKategori from '../admin/pages/DataKategori'
import FormTambahKategori from '../admin/pages/Form/FormTambahKategori'
import EditKategori from '../admin/pages/Form/FormEditKategori'
import DataPeminjaman from '../admin/pages/DataPeminjaman'
import FormEditPeminjaman from '../admin/pages/Form/FormEditPeminjaman'
import FormTambahPeminjaman from '../admin/pages/Form/FormTambahPeminjaman'
import DataLaporan from '../admin/pages/DataLaporan'
import DataMurid from '../admin/pages/DataMurid'
import FormTambahMurid from '../admin/pages/Form/FormTambahMurid'
import EditMurid from '../admin/pages/Form/FormEditMurid'

// ==== Guards ====
import GuestRoutes from './GuestRoutes'
import ProtectedRoute from './ProtectedRoute'
import RoleBlocker from './RoleBlocker'

function RoutesApp() {
  const navigate = useNavigate()

  // ==== Auto Logout If Token Expired ====
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const decoded = jwtDecode(token)
      if (decoded.exp < Date.now() / 1000) {
        localStorage.clear()
        navigate('/login')
      }
    } catch {
      localStorage.clear()
      navigate('/login')
    }
  }, [navigate])

  return (
    <Routes>
      {/* ======================== */}
      {/* 🌍 PUBLIC ROUTES */}
      {/* ======================== */}

      {/* Landing Page */}
      <Route
        path="/"
        element={
          <RoleBlocker blockedRoles={['admin', 'murid']}>
            <Home />
          </RoleBlocker>
        }
      />

      {/* Auth */}
      <Route
        path="/login"
        element={
          <GuestRoutes>
            <Login />
          </GuestRoutes>
        }
      />
      <Route
        path="/register"
        element={
          <GuestRoutes>
            <Register />
          </GuestRoutes>
        }
      />

      {/* Public Menu (DIBLOCK untuk admin & murid) */}
      <Route
        path="/book"
        element={
          <RoleBlocker blockedRoles={['admin', 'murid']}>
            <Book />
          </RoleBlocker>
        }
      />
      <Route
        path="/book/detailbook/:id"
        element={
          <RoleBlocker blockedRoles={['admin', 'murid']}>
            <BookDetail />
          </RoleBlocker>
        }
      />
      <Route
        path="/help"
        element={
          <RoleBlocker blockedRoles={['admin', 'murid']}>
            <Help />
          </RoleBlocker>
        }
      />

      {/* ======================== */}
      {/* 🎓 MURID ROUTES */}
      {/* ======================== */}

      <Route
        path="/murid"
        element={
          <ProtectedRoute allowedRoles={['murid']}>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/murid/profile"
        element={
          <ProtectedRoute allowedRoles={['murid']}>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/murid/riwayat"
        element={
          <ProtectedRoute allowedRoles={['murid']}>
            <RiwayatPeminjaman />
          </ProtectedRoute>
        }
      />

      {/* Alias untuk Navbar Murid */}
      <Route
        path="/murid/book"
        element={
          <ProtectedRoute allowedRoles={['murid']}>
            <Book />
          </ProtectedRoute>
        }
      />
      <Route
        path="/murid/book/detailbook/:id"
        element={
          <ProtectedRoute allowedRoles={['murid']}>
            <BookDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/murid/help"
        element={
          <ProtectedRoute allowedRoles={['murid']}>
            <Help />
          </ProtectedRoute>
        }
      />

      {/* ======================== */}
      {/* 🛡️ ADMIN ROUTES */}
      {/* ======================== */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />

        {/* Buku */}
        <Route path="DataBuku">
          <Route index element={<DataBuku />} />
          <Route path="FormTambahBuku" element={<FormTambahBuku />} />
          <Route path="Edit/:id" element={<EditBuku />} />
        </Route>

        {/* Eksemplar */}
        <Route path="DataEksemplar">
          <Route index element={<DataEksemplar />} />
          <Route path="Edit/:id" element={<FormEditEksemplar />} />
        </Route>

        {/* Peminjaman */}
        <Route path="DataPeminjaman">
          <Route index element={<DataPeminjaman />} />
          <Route
            path="FormTambahPeminjaman"
            element={<FormTambahPeminjaman />}
          />
          <Route path="Edit/:id" element={<FormEditPeminjaman />} />
        </Route>

        {/* Laporan */}
        <Route path="DataLaporan" element={<DataLaporan />} />

        {/* Murid */}
        <Route path="DataMurid">
          <Route index element={<DataMurid />} />
          <Route path="FormTambahMurid" element={<FormTambahMurid />} />
          <Route path="Edit/:id" element={<EditMurid />} />
        </Route>

        {/* Kategori */}
        <Route path="DataKategori">
          <Route index element={<DataKategori />} />
          <Route path="FormTambahKategori" element={<FormTambahKategori />} />
          <Route path="Edit/:id" element={<EditKategori />} />
        </Route>
      </Route>

      {/* Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default RoutesApp
