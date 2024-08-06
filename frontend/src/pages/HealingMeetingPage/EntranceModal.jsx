// ConfirmModal.js
import React from 'react';

const EntranceModal = ({ show, message, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded bg-white p-4 shadow-md">
        <p>{message}</p>
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

export default EntranceModal;
