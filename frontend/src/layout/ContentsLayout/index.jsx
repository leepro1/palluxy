import PropTypes from 'prop-types';

const ContentsLayout = ({ children }) => {
  return <div className="mx-auto my-0 w-[1380px]">{children}</div>;
};

ContentsLayout.propTypes = {
  children: PropTypes.element,
};

export default ContentsLayout;
