import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'

const RoleBlocker = ({ children, blockedRoles }) => {
  let user = null

  try {
    const storedUser = localStorage.getItem('user')
    if (storedUser && storedUser !== 'undefined') {
      user = JSON.parse(storedUser)
    }
  } catch (err) {}

  // User sudah login → cek apakah role-nya diblokir
  if (user?.role) {
    const userRole = user.role.toLowerCase()
    const blocked = blockedRoles.map((r) => r.toLowerCase())

    if (blocked.includes(userRole)) {
      if (userRole === 'admin') return <Navigate to="/admin" replace />
      if (userRole === 'murid') return <Navigate to="/murid" replace />
      return <Navigate to="/" replace />
    }
  }

  return children
}

RoleBlocker.propTypes = {
  children: PropTypes.node.isRequired,
  blockedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default RoleBlocker
