import React from 'react';
import Modal from 'react-modal';

interface BankModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  modalData: any;
  onSave: () => void;
  onChange: (field: string, value: string) => void;
}

const AddBankModal: React.FC<BankModalProps> = ({ isOpen, onRequestClose, modalData, onSave, onChange }) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose} 
      contentLabel="Add Bank" 
      className="fixed inset-0 flex items-center justify-center p-4"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Add Bank</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Bank Name</label>
          <input
            type="text"
            value={modalData.name || ''}
            onChange={(e) => onChange('name', e.target.value)}
            className="border p-2 w-full"
            placeholder="Enter Bank Name"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={onRequestClose}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          >
            Discard
          </button>
          <button
            onClick={onSave}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddBankModal;
