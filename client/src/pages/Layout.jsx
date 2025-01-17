import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';

const Layout = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="min-h-screen min-w-full flex flex-col overflow-hidden scrollbar-hidden">
      <div className="flex flex-1 bg-black h-full w-full">
        <div className="h-full p-4">
          <Sidebar />
        </div>
        <main className="flex-1 overflow-hidden p-6">
          <Navbar onSearch={handleSearch} />
          <div className="flex-1 overflow-y-auto p-4 rounded-2xl mt-5 h-[calc(100vh-108px)] scrollbar-hidden">
            <Outlet context={{ searchTerm }} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
