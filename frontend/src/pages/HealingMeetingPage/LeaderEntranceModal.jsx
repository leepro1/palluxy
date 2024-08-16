import PropTypes from 'prop-types';

const LeaderEntranceModal = ({
  show,
  message,
  onConfirm,
  onCancel,
  handleChangeApproveKey,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded bg-white p-4 shadow-md">
        <p>{message}</p>
        <div>
          <label className="my-1 block text-sm font-bold text-gray-700">
            입장 키:
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            type="text"
            id="userName"
            onChange={handleChangeApproveKey}
            required
          />
        </div>

        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="rounded bg-pal-disable px-4 py-2 text-white hover:bg-gray-500"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="rounded bg-pal-purple px-4 py-2 text-white hover:bg-purple-950"
          >
            예
          </button>
        </div>
      </div>
    </div>
  );
};

LeaderEntranceModal.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  handleChangeApproveKey: PropTypes.func.isRequired,
};

export default LeaderEntranceModal;
