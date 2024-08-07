import { Outlet } from 'react-router-dom';
import Header from './Header';

import { Component } from 'react';
import NavbarTop from './NavbarTop';
import NavbarBottom from './Navbarbottom';
import Sidebar from './Sidebar';
import SidebarItem from './SidebarItem';

export default class MainLayout extends Component {
  
    render() {
    return (
        <div>
            <Header> 
                <NavbarTop/>
                <NavbarBottom/>
                <Sidebar>
                    <SidebarItem></SidebarItem>
                </Sidebar>
            </Header>
            <main>
                <Outlet />
            </main>
        </div>
    )
  }

}
