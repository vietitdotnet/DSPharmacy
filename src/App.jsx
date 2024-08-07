
import { useEffect } from "react";
import './App.css'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { initFlowbite } from "flowbite";

import MainLayout from './components/MainLayout';
import HomePage from "./pages/HomePage";
import AboutPage from './pages/AboutPage';
import DetailProductPage from './pages/DetailProductPage';
import ContactPage from './pages/ContactPage';

import ManagerLayout from './components/ManagerLayout';
import ProductPage  from './mngpages/ProductPage';

function App() {
  
  useEffect(() => {
  
    initFlowbite();
  }, []);
  return (
   <>
      <Router>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="contact" element={<ContactPage />} />
                    <Route path="/detail/:slug" element={<DetailProductPage/>} />
                </Route>
               
                <Route path="/manager" element={<ManagerLayout />}>
                    <Route path="products" element={<ProductPage/>} />
                </Route>
            </Routes>
        </Router>
   </>
  )
}

export default App
