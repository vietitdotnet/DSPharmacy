import { useState, useEffect } from 'react';
import ProductTable from './ProductTable';
import ProductModal from './ProductModal';
import {  getProducts, createProduct, updateProduct , deleteProduct} from "../API";

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [notification, setNotification] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(true);


  // Lấy danh sách sản phẩm từ API khi khởi động
  useEffect(() => {
    const fetchProducts = async () => {
        try {
            const response = await getProducts();
            
            setProducts(response.data);

          
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    fetchProducts();
}, []);

  const onCreate = async (newProduct) => {

    try {
      const response = await createProduct(newProduct);
        setProducts([...products, response.data]);
        setNotification('Product created successfully!');
    } catch (error) 
    {
      setNotification('Error: ' + error.message);
    }
  };

  
  const onDelete = async (id , products) => {
    try {
        await deleteProduct(id);

        setProducts(products.filter(product => product.id !== id));

        setNotification('Product Delete successfully!');

    } catch (error) {
        console.error('Error deleting product:', error);
    }
  };



  const onUpdate = async (updatedProduct) => {

    try {
        
      
      await updateProduct(updatedProduct.id, updatedProduct);
      setProducts(products.map(product => (product.id === updatedProduct.id ? updatedProduct : product)));   
      setNotification('Product updated successfully!');
      
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleOpenModal = (product = null) => {
    setSelectedProduct(product);
    setIsCreateMode(product === null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  return (
    
    <div>
      <h1>Product Manager</h1>
      {notification && <div className="notification">{notification}</div>}
      <button onClick={() => handleOpenModal()}>Create New Product</button>
      <ProductTable products={products} onUpdate={handleOpenModal} onDelete={onDelete} />
      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={selectedProduct}
        isCreateMode={isCreateMode}
        onSubmit={isCreateMode ? onCreate : onUpdate}
      />
    </div>
  );

};

export default ProductManager;