import React from 'react';

interface SearchBarProps {
  searchText: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchText, onSearchChange }) => (
  <input
    type="text"
    placeholder="Search..."
    className="p-2 border border-gray-300 rounded"
    value={searchText}
    onChange={onSearchChange}
  />
);

export default SearchBar;
