import PropTypes from 'prop-types';

const Button = ({ size, text, className }) => {
  const btnSize = {
    sm: 'w-[90px] h-10',
    md: 'w-[130px] h-10',
    lg: 'w-[170px] h-10',
  };
  return (
    <button
      className={`rounded-md ${btnSize[size]} ${className}`}
      type="button"
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  size: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
export default Button;
