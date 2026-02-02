import PropTypes from 'prop-types'

const FeatureCard = ({
  title,
  icon: Icon,
  color = 'bg-blue-500',
  onClick,
  count,
}) => {
  return (
    <div
      className={`p-5 rounded-2xl shadow-md hover:shadow-lg cursor-pointer transition transform hover:scale-[1.02] duration-200 text-white ${color}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        {/* Title & Count */}
        <div>
          <h2 className="text-base sm:text-lg font-semibold">{title}</h2>
          {typeof count === 'number' && (
            <p className="text-sm font-normal text-white text-opacity-80 mt-1">
              {count} data
            </p>
          )}
        </div>

        {/* Icon */}
        <div className="bg-white bg-opacity-20 p-2 rounded-full">
          <Icon size={24} />
        </div>
      </div>
    </div>
  )
}

FeatureCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  color: PropTypes.string,
  onClick: PropTypes.func,
  count: PropTypes.number,
}

export default FeatureCard
