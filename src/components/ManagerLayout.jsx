// import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const ManagerLayout = () => {
    return (
        <div>
            <header>
                <h1>Admin Panel</h1>
                <nav>
                    <Link to="/manager/products">Quản lý sản phẩm</Link>
                   
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <p>&copy; 2024 Admin Panel</p>
            </footer>
        </div>
    );
};

export default ManagerLayout;