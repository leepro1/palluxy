import PropTypes from 'prop-types';
import { useQueryClient, useMutation } from '@tanstack/react-query';

const MemorySpaceCreateModal = ({ handler }) => {
  return (
    <div>
      <div
        className="fixed left-0 top-0 h-screen w-screen overflow-hidden bg-black opacity-50"
        onClick={() => handler(false)}
      ></div>
      {/* main modal창 */}
      <div className="absolute left-1/2 top-1/2 w-[500px] -translate-x-1/2 -translate-y-1/2 bg-white">
        <span>asdf</span>
      </div>
    </div>
  );
};

MemorySpaceCreateModal.propTypes = {
  handler: PropTypes.func.isRequired,
};

export default MemorySpaceCreateModal;
