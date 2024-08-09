// import React from 'react';
import { Outlet } from 'react-router-dom';

import NavbarManager from './NavbarManager';
import SidebarManager from './SidebarManager';
const ManagerLayout = () => {
    return (     
        <div>          
            <NavbarManager/>              
            <SidebarManager/>
            <main className='mt-10'>
            <Outlet />
            </main>          
            
        </div>
    );
};

export default ManagerLayout;