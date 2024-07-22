import PropTypes from 'prop-types';

const GlobalBtn = ({ size, text, className, onClick }) => {
  const btnSize = {
    sm: 'w-[90px] h-10',
    md: 'w-[130px] h-10',
    lg: 'w-[170px] h-10',
  };
  return (
    <button
      onClick={onClick && onClick}
      className={`rounded-md ${btnSize[size]} ${className}`}
      type="button"
    >
      {text}
    </button>
  );
};

GlobalBtn.propTypes = {
  size: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
export default GlobalBtn;
