import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'

function GuestRoutes({ children }) {
  let user = null

  try {
    const storedUser = localStorage.getItem('user')
    if (storedUser && storedUser !== 'undefined') {
      user = JSON.parse(storedUser)
    }
  } catch (error) {
    console.error('Error parsing user:', error)
  }

  // Kalau sudah login → tendang
  if (user?.role) {
    const role = user.role.toLowerCase()

    if (role === 'admin') return <Navigate to="/admin" replace />
    if (role === 'murid') return <Navigate to="/murid" replace />

    return <Navigate to="/" replace />
  }

  return children
}

GuestRoutes.propTypes = {
  children: PropTypes.node.isRequired,
}

export default GuestRoutes
