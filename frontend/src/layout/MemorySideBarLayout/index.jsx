import PropTypes from 'prop-types';

const MemorySideBarLayout = ({ children }) => {
  return <div className="my-5">{children}</div>;
};

MemorySideBarLayout.propTypes = {
  children: PropTypes.element,
};

export default MemorySideBarLayout;
