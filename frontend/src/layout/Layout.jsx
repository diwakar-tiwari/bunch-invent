import React from 'react';
import SideMenu from './sideMenu'

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <SideMenu />
      <div className="ml-64 p-4 w-full">{children}</div>
    </div>
  );
};

export default Layout;
