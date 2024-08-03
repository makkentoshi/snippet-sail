'use client';
import { useState } from 'react';
import { UserButton } from '@clerk/nextjs';

const SearchBar = () => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    // Implement your search logic here
    console.log('Searching for:', query);
  };

  return (
    <div className="flex items-center  bg-white p-2 border border-gray-300 rounded-lg">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border-0 p-2 w-full"
        placeholder="Search..."
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white rounded-lg p-2"
      >
        Search
      </button>
      <UserButton />
    </div>
  );
};

export default SearchBar;