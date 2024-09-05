import React from 'react';

interface AddCardButtonProps {
  onClick: () => void;
}

const AddCardButton: React.FC<AddCardButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="bg-green-500 text-white px-4 py-2 rounded"
  >
    Add Card
  </button>
);

export default AddCardButton;
