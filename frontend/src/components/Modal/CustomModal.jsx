import PropTypes from 'prop-types';

function CustomModal({ isOpen, onClose, title, message, btnText = '확인' }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex w-[300px] flex-col rounded bg-white p-6 shadow-lg">
        <h2 className="mb-4 font-jamsilRegular text-2xl">{title}</h2>
        <p className="mb-4 font-jamsilLight">{message}</p>
        <div className="flex justify-end font-jamsilRegular">
          <button
            onClick={onClose}
            className="rounded bg-pal-purple px-4 py-2 text-white"
          >
            {btnText}
          </button>
        </div>
      </div>
    </div>
  );
}

CustomModal.propTypes = {
  isOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  btnText: PropTypes.string,
};

export default CustomModal;
