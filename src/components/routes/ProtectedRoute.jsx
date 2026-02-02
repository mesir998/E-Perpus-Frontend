import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'

function ProtectedRoute({ children, allowedRoles }) {
  let user = null

  try {
    const storedUser = localStorage.getItem('user')
    if (storedUser && storedUser !== 'undefined') {
      user = JSON.parse(storedUser)
    }
  } catch (error) {}

  // Kalau belum login
  if (!user || !user.role) {
    return <Navigate to="/login" replace />
  }

  const role = user.role.toLowerCase()

  // Role tidak diizinkan
  if (!allowedRoles.includes(role)) {
    const redirectPath =
      {
        admin: '/admin',
        murid: '/murid',
      }[role] || '/'

    return <Navigate to={redirectPath} replace />
  }

  return children
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default ProtectedRoute
