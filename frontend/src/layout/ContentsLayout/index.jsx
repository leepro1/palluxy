import PropTypes from 'prop-types';

const ContentsLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="mx-auto my-0 w-[1380px]">{children}</div>
    </div>
  );
};

ContentsLayout.propTypes = {
  children: PropTypes.node,
};

export default ContentsLayout;
