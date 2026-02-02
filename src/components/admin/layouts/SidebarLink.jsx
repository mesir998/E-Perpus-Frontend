// src/components/admin/layouts/SidebarLink.jsx

import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

const SidebarLink = ({ item, setIsOpen }) => {
  return (
    <li>
      <NavLink
        to={item.path}
        end={item.path === '/admin'}
        className={({ isActive }) =>
          `flex items-center gap-3 px-2 py-1.5 rounded transition duration-300 ${
            isActive
              ? 'text-blue-300 font-semibold bg-gray-700'
              : 'text-white hover:text-teal-400 hover:bg-gray-700'
          }`
        }
        onClick={() => setIsOpen(false)} // Tutup sidebar di mobile
      >
        {item.icon}
        {item.name}
      </NavLink>
    </li>
  )
}

SidebarLink.propTypes = {
  item: PropTypes.object.isRequired,
  setIsOpen: PropTypes.func.isRequired,
}

export default SidebarLink
