import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Switch } from '@headlessui/react';
import axios from 'axios';
import { baseUrl } from '@/api/apiService';

interface Bank {
  bankId: number;
  name: string;
}

interface CardModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  isEditing: boolean;
  modalData: Partial<any>;
  onSave: () => void;
  onChange: (field: string, value: any) => void;
}

const CardModal: React.FC<CardModalProps> = ({ isOpen, onRequestClose, isEditing, modalData, onSave, onChange }) => {
  const [banks, setBanks] = useState<Bank[]>([]); 

  useEffect(() => {
    if (isOpen) {
      axios.get(`${baseUrl}/api/bank`)
        .then((response) => {
          setBanks(response.data.banks);
        })
        .catch((error) => {
          console.error('Error fetching banks:', error);
        });
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed inset-0 flex items-center justify-center p-4"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      contentLabel={isEditing ? 'Edit Credit Card' : 'Add Credit Card'}
    >
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit Credit Card' : 'Add Credit Card'}</h2>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Credit Card Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={modalData.name || ''}
            onChange={(e) => onChange('name', e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Bank Name</label>   
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={modalData.bankId || ''}
            onChange={(e) => onChange('bankId', parseInt(e.target.value, 10))} 
          >
            {banks.map((bank) => (
              <option key={bank.bankId} value={bank.bankId}>
                {bank.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Enabled</label>
          <Switch
            checked={modalData.enabled || false}
            onChange={(enabled) => onChange('enabled', enabled)}
            className={`${modalData.enabled ? 'bg-green-500' : 'bg-gray-300'} relative inline-flex items-center h-6 rounded-full w-11`}
          >
            <span
              className={`${modalData.enabled ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full`}
            />
          </Switch>
        </div>
        {isEditing && (
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Created At</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded bg-gray-100"
              value={modalData.createdAt}
              disabled
            />
          </div>
        )}
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

export default CardModal;
