'use client';
import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import SearchBar from './Searchbar';

const TopBar = ({ collapsed, setCollapsed }: { collapsed: boolean, setCollapsed: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener('resize', handleResize);

  
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex items-center justify-between bg-gray-100 p-4 relative"
    >
      {!isMobile && (
        <Button
          type="text"
          className="absolute left-5 top-9 bg-white"
          onClick={() => setCollapsed(!collapsed)}
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        />
      )}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-1/2">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default TopBar;