// import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import NavbarTop from './NavbarTop';


const ManagerLayout = () => {
    return (
        <div>
            <Header> 
                <NavbarTop/>              
            </Header>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default ManagerLayout;