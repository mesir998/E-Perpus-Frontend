import PropTypes from 'prop-types'

const StatCard = ({ title, value }) => (
  <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition">
    <h3 className="text-base sm:text-lg font-medium text-gray-700">{title}</h3>
    <p className="text-xl sm:text-2xl font-bold mt-2 text-gray-900">{value}</p>
  </div>
)

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

export default StatCard
