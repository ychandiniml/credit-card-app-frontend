"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Switch } from '@headlessui/react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import SearchBar from '@/components/SearchBar';
import AddButton from '@/components/AddButton';
import DataTable from '@/components/DataTable';
import AddCardModal from '@/components/AddCardModal';
import DeleteModal from '@/components/DeleteModal';
import { fetchCards, addCard, updateCard, deleteCard } from '../../api/apiService';

interface CreditCard {
  cardId: number;
  name: string;
  bankName: string;
  enabled: boolean;
  createdAt: string;
  bankId: number;
}

const CreditCardTable: React.FC = () => {
  const [rowData, setRowData] = useState<CreditCard[]>([]);
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalData, setModalData] = useState<Partial<CreditCard>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  useEffect(() => {
    const getCards = async () => {
      try {
        const data = await fetchCards();
        setRowData(formatCardData(data));
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };
    getCards();
  }, []);

  const filteredData = useMemo(() => {
    return rowData.filter(card =>
      card.name.toLowerCase().includes(searchText.toLowerCase()) ||
      card.bankName.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, rowData]);


  const columnDefs = useMemo(() => [
    { headerName: "ID", field: "cardId", sortable: true, filter: true  },
    { headerName: "Bank Name", field: "bankName", sortable: true, filter: true  },
    { headerName: "Credit Card Name", field: "name", sortable: true, filter: true  },
    { headerName: "Created At", field: "createdAt", sortable: true, filter: true  },
    {
      headerName: "Enabled",
      field: "enabled",
      cellRenderer: (params: any) => (
        <Switch
          checked={params.value}
          onChange={() => {}}
          className={`${params.value ? 'bg-green-500' : 'bg-gray-300'} relative inline-flex items-center h-6 rounded-full w-11`}
        >
          <span
            className={`${params.value ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full`}
          />
        </Switch>
      )
    },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params: any) => (
        <>
          <button
            onClick={() => handleEditCard(params.data)}
            className="bg-blue-500 text-white px-3 py-2 text-xs font-medium rounded hover:bg-blue-800"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteModal(params.data.cardId)}
            className="bg-red-500 text-white px-3 py-2 text-xs font-medium rounded hover:bg-red-800"
          >
            Delete
          </button>
        </>
      )
    }
  ], []);

  const handleEditCard = (card: CreditCard) => {
    setSelectedCardId(card.cardId);
    setModalData({ ...card });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteModal = (cardId: number) => {
    setSelectedCardId(cardId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteCard = async () => {
    try {
      if (selectedCardId) {
        await deleteCard(selectedCardId);
        setRowData(rowData.filter(card => card.cardId !== selectedCardId));
        setIsDeleteModalOpen(false);
      }
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  const handleSaveCard = async () => {
    try {
      if (isEditing) {
        await updateCard(selectedCardId as number, {
          ...modalData,
          bankId: modalData.bankId, 
        });

        const updatedCards = await fetchCards();
        setRowData(formatCardData(updatedCards));
      } else {
        const newCard = {
          name: modalData.name,
          bankId: modalData.bankId, 
          enabled: modalData.enabled,
        };

        const response = await addCard(newCard);

        const updatedCards = await fetchCards();
        setRowData(formatCardData(updatedCards));
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving card:', error);
    }
  };

  const handleAddCard = () => {
    setModalData({ enabled: true });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Credit Cards</h1>

      <div className="flex justify-between mb-4">
        <SearchBar searchText={searchText} onSearchChange={(e) => setSearchText(e.target.value)} />
        <AddButton onClick={handleAddCard} label="Add Card" />
      </div>

      <DataTable
        rowData={filteredData}
        columnDefs={columnDefs}
        paginationPageSize={10}
      />

      <AddCardModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        isEditing={isEditing}
        modalData={modalData}
        onSave={handleSaveCard}
        onChange={(field, value) => setModalData({ ...modalData, [field]: value })}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDeleteCard}
      />
    </div>
  );
};

export default CreditCardTable;

// Helper function to format card data
const formatCardData = (data: any): CreditCard[] => {
  return data.cards.map((card: any) => ({
    cardId: card.cardId,
    name: card.name,
    bankName: card.bank.name, 
    enabled: card.enabled,
    createdAt: new Date(card.createdAt).toLocaleDateString(),
    bankId: card.bankId 
  }));
};
