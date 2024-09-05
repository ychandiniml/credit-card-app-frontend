import React from 'react';
import Modal from 'react-modal';

interface DeleteModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onRequestClose, onDelete }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    className="fixed inset-0 flex items-center justify-center p-4"
    overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    contentLabel="Confirm Delete"
  >
    <div className="bg-white p-6 rounded-lg w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
      <p>Are you sure you want to delete this credit card?</p>
      <div className="flex justify-end mt-4">
        <button
          onClick={onRequestClose}
          className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
        >
          Cancel
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  </Modal>
);

export default DeleteModal;
