"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { fetchBanks, addBank } from '../../api/apiService';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import DataTable from '@/components/DataTable';
import AddButton from '@/components/AddButton';
import AddBankModal from '@/components/AddBankModal';

interface Bank {
  bankId: number;
  name: string;
  createdAt: string;
}

const BankPage: React.FC = () => {
  const [rowData, setRowData] = useState<Bank[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<Partial<Bank>>({});

  useEffect(() => {
    const getBanks = async () => {
      try {
        const data = await fetchBanks();
        setRowData(formatBankData(data));
      } catch (error) {
        console.error('Error fetching banks:', error);
      }
    };
    getBanks();
  }, []);

  const columnDefs = useMemo(() => [
    { headerName: "ID", field: "bankId", sortable: true, filter: true },
    { headerName: "Bank Name", field: "name", sortable: true, filter: true },
    { headerName: "Created At", field: "createdAt", sortable: true },
  ], []);


  const handleAddBank = () => {
    setModalData({});
    setIsModalOpen(true);
  };

  const handleSaveBank = async () => {
    try {
      const newBank = {
        name: modalData.name,
      };
      await addBank(newBank);
      const updatedBanks = await fetchBanks();
      setRowData(formatBankData(updatedBanks));
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding bank:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Banks</h1>

      <div className="mb-4">
        <AddButton onClick={handleAddBank} label="Add Bank" />
      </div>

      <DataTable rowData={rowData}  columnDefs={columnDefs} paginationPageSize={5} />
      <AddBankModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        modalData={modalData}
        onSave={handleSaveBank}
        onChange={(field, value) => setModalData({ ...modalData, [field]: value })}
      />
    </div>
  );
};

export default BankPage;

// Helper function
const formatBankData = (data: any): Bank[] => {
  return data.banks.map((bank: any) => ({
    bankId: bank.bankId,
    name: bank.name,
    createdAt: new Date(bank.createdAt).toLocaleDateString(),
  }));
};
