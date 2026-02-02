// 📂 src/components/layout/NavbarLinks.jsx
import { Link } from 'react-router-dom'

export default function NavbarLinks({ links, isActive }) {
  return (
    <>
      {links.map((item) => (
        <li key={item.path}>
          <Link
            to={item.path}
            className={`block py-2 px-3 rounded transition duration-300 ${
              isActive(item.path)
                ? 'text-teal-400 font-bold'
                : 'text-white hover:text-teal-400'
            }`}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </>
  )
}
