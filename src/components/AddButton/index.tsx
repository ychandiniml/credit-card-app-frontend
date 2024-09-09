import React from 'react';

interface AddButtonProps {
  onClick: () => void;
  label: string;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick, label }) => (
  <button
    onClick={onClick}
    className="bg-green-500 text-white px-4 py-2 rounded"
  >
    {label}
  </button>
);

export default AddButton;
