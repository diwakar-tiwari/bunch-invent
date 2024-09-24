import React from 'react';
import { Outlet } from 'react-router-dom';
import SideMenu from './sideMenu';

const Layout = () => {
  return (
    <div className="flex">
      <SideMenu />
      <div className="ml-64 p-4 w-full">
        {/*
        <header>
          <h1>Your App Header</h1>
          {/* You can add any navigation or other layout components here 
        </header>
        */}
        <main>
          <Outlet /> {/* Renders the child routes */}
        </main>
        {/* <footer>
          <p>Your App Footer</p>
        </footer> */}
      </div>
    </div>
  );
};

export default Layout;
