import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

interface DataTableProps {
  rowData: any[];
  columnDefs: any[];
  paginationPageSize: number;
}

const DataTable: React.FC<DataTableProps> = ({ rowData, columnDefs, paginationPageSize }) => (
  <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
    <AgGridReact
      rowData={rowData}
      columnDefs={columnDefs}
      pagination={true}
      paginationPageSize={paginationPageSize}
    />
  </div>
);

export default DataTable;
