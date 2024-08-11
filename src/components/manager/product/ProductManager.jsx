import { useState, useEffect } from 'react';
import ProductTable from './ProductTable';
import ProductModal from './ProductModal';
import DeleteModalProduct from './DeleteModalProduct';
import {  getProducts, createProduct, updateProduct , deleteProduct , getCategorizations , getCategorys} from "../API";
import { Link } from 'react-router-dom';


"use client";

import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";

const ProductManager = () => {
  const [categorys, setgetCategorys] = useState([]);
  const [categorizations, setCategorizations] = useState([]);
  const [products, setProducts] = useState([]);
  const [notification, setNotification] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDelteteModalOpen] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showAlert, setShowAlert] = useState(false);
  // Lấy danh sách sản phẩm từ API khi khởi động
  useEffect(() => {
    const fetchProducts = async () => {
        try {
            const response = await getProducts();
            const dataCategorizations = await getCategorizations();

            const dataCategorys = await getCategorys();
            setProducts(response.data);

            setCategorizations(dataCategorizations.data);

            setgetCategorys(dataCategorys.data);
        } catch (err) {

          setError('Đả xảy ra lỗi khi thiết lập yêu cầu:', error);
            
        }
    };

    fetchProducts();
}, []);

  const onCreate = async (newProduct) => {
    
    try {
      setLoading(true);
      const response = await createProduct(newProduct);
        setProducts([...products, response.data]);
        setNotification('Thêm thành công sản phẩm ! ');
        handleCloseModal();
        setShowAlert(true);
    } catch (err) {
      
      if (err.response) {
          if (err.response.status === 400) {
            // Xử lý lỗi BadRequest (400)
            const errorMessage = err.response.data.errors
              ? Object.values(err.response.data.errors).flat().join(' ')
              : err.response.data.message || 'Yêu cầu không được chấp nhận. Vui lòng kiểm tra đầu vào của bạn.';
            
              setError(errorMessage);
            
          } else
          {
            setError('Đã xảy ra lỗi. Vui lòng thử lại sau.');
          }
      } else if (err.request) {
        
        setError('Không có phản hồi từ máy chủ. Vui lòng kiểm tra kết nối của bạn.');
      } else {
        
        setError('Đã xảy ra lỗi khi thiết lập yêu cầu.');
      }
    }finally 
    {
      setLoading(false);
      // setShowAlert(true);
    }
  };

  
  const onDelete = async (id) => {
    try {
        setLoading(true);
        await deleteProduct(id);
        setProducts(products.filter(product => product.id !== id));
        handleCloseDeleteModal();
        setNotification('Xóa thành công sản phẩm !');
        setShowAlert(true);
    } catch (err) {
      
      if (err.response) {
          if (err.response.status === 400) {
            // Xử lý lỗi BadRequest (400)
            const errorMessage = err.response.data.errors
              ? Object.values(err.response.data.errors).flat().join(' ')
              : err.response.data.message || 'Yêu cầu không được chấp nhận. Vui lòng kiểm tra đầu vào của bạn.';
            
              setError(errorMessage);
            
          } else
          {
            setError('Đã xảy ra lỗi. Vui lòng thử lại sau.');
          }
      } else if (err.request) {
        
        setError('Không có phản hồi từ máy chủ. Vui lòng kiểm tra kết nối của bạn.');
      } else {
        
        setError('Đã xảy ra lỗi khi thiết lập yêu cầu.');
      }
    }finally 
    {
      setLoading(false);
      
    }
  };


  const onUpdate = async (updatedProduct) => {
    try {
      
      setLoading(true);
      await updateProduct(updatedProduct.id, updatedProduct);
      setProducts(products.map(product => (product.id === updatedProduct.id ? updatedProduct : product)));   
      setNotification('Cập nhật thành công sản phẩm ! ');
      handleCloseModal();
      setShowAlert(true);

    } catch (err) {
      
      if (err.response) {
          if (err.response.status === 400) {
            // Xử lý lỗi BadRequest (400)
            const errorMessage = err.response.data.errors
              ? Object.values(err.response.data.errors).flat().join(' ')
              : err.response.data.message || 'Yêu cầu không được chấp nhận. Vui lòng kiểm tra đầu vào của bạn.';
            
              setError(errorMessage);
              
          } else
          {
            setError('Đã xảy ra lỗi. Vui lòng thử lại sau.');
          }
      } else if (err.request) {
        
        setError('Không có phản hồi từ máy chủ. Vui lòng kiểm tra kết nối của bạn.');
      } else {
        
        setError('Đã xảy ra lỗi khi thiết lập yêu cầu.');
      }
    }finally 
    {
      setLoading(false);
    }
  };

  const handleOpenModal = (product = null) => {
    setShowAlert(false);
    setSelectedProduct(product);
    setIsCreateMode(product === null);
    setIsModalOpen(true);
    setError(null)
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
    setError(null);
    
  };

  const handleOpenDeleteModal = (product) => {
    setShowAlert(false);
    setSelectedProduct(product);
    setIsDelteteModalOpen(true);
    setError(null)
    
  };
  const handleCloseDeleteModal = () => {
    setSelectedProduct(null);
    setIsDelteteModalOpen(false);
    setError(null)
  };

  const handleCloseAlert = () => {
    setShowAlert(false); // Ẩn alert
    setError(null)
  };
 

  return (
    <div>
      <Breadcrumb className='pt-5 pb-5' aria-label="Default breadcrumb example">
          <Breadcrumb.Item to="/" icon={HiHome}>
            <Link to="/manager">
             Manager
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
          <Link to="/manager/products">
             Sản phẩm
            </Link>
          </Breadcrumb.Item>
          
      </Breadcrumb>

      {showAlert && 
        <div id="alert-border-1" className="flex items-center p-4 mb-4 text-blue-800 border-t-4 border-blue-300 bg-blue-50 dark:text-blue-400 dark:bg-gray-800 dark:border-blue-800" role="alert">
        <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
        <div className="ms-3 text-sm font-medium">
          {notification} <a href="#" className="font-semibold underline hover:no-underline">Xem chi tiết sản phẩm</a>
        </div>
        <button onClick={handleCloseAlert} type="button" className="ms-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-border-1" aria-label="Close">
          <span className="sr-only">Dismiss</span>
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
        </button>
        </div>
      }


      <button onClick={() => handleOpenModal()} type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">+ Tạo mới sản phẩm</button>

      <ProductTable products={products} onUpdate={handleOpenModal} onDelete={handleOpenDeleteModal} />
      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={selectedProduct}
        isCreateMode={isCreateMode}
        onSubmit={isCreateMode ? onCreate : onUpdate}
        categorizations={categorizations}
        categorys ={categorys}
        loading ={loading}
        error ={error}
      />
      <DeleteModalProduct
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onDelete={onDelete}
        product={selectedProduct}
        loading ={loading}
        error ={error}
      />
    </div>
  );

};

export default ProductManager;