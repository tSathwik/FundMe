import React, { useState } from 'react';
import { asset5 } from '../images';

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm); 
  };

  return (
    <div className="text-white p-1 flex gap-20 items-center ml-20">
      <div className="search-bar flex gap-2 items-center border-2 border-[#1DC071] p-1 rounded-md">
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent text-white outline-none p-1 flex-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-[#1DC071] text-black px-4 py-1 rounded-md"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="profile-icon">
        <img src={asset5} alt="Profile" className="w-8 h-8 rounded-full" />
      </div>
    </div>
  );
};

export default Navbar;
