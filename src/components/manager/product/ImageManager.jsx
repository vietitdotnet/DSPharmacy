import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {useParams }  from "react-router-dom"
import { getImageProducts, createImageProduct, deleteImage} from "../API";
import load from '../../../assets/images/load.gif';
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import DeleteModalImage from './DeleteModalImage';
const ImageManager = () => {

  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const { productId } = useParams();
  const [imgId, setImgId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const [notification, setNotification] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false); // Trạng thái submit form

  const [isDeleteModalOpen, setIsDelteteModalOpen] = useState(false);
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {

    try {
      const images = await getImageProducts(productId);
  
      setImages(images.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách hình ảnh:', error);
    }
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
    setError(null);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!selectedImage) {
      setError('Vui lòng chọn một hình ảnh để tải lên');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedImage);

    setIsSubmitting(true);

    try {
      setLoading(true);
      await createImageProduct(productId , formData)
      setShowAlert(true);
      setNotification("hình ảnh được tải lên thành công");
      setSelectedImage(null);
      fetchImages(); 
     
    } catch (error) {
      setError('Lỗi khi tải hình ảnh lên');
    }finally 
    {
      setLoading(false);
      setIsSubmitting(false);
      // setShowAlert(true);
    }
  };

  const handleDelete = async (imageId) => {
    try {
      setLoading(true);
      await deleteImage(productId , imageId);
     
      setShowAlert(true);
      setNotification("Xóa thành công hình ảnh");
      setIsDelteteModalOpen(false);
      fetchImages(); // Cập nhật danh sách hình ảnh
    } catch (error) {
  
      setError('Lỗi khi xóa hình ảnh');
    }finally 
    {
      setLoading(false);
     
      // setShowAlert(true);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false); // Ẩn alert
    
  };

  const handleOpenDeleteModal = (imageId) => {
    setShowAlert(false);
    setImgId(imageId);
    debugger
    setIsDelteteModalOpen(true);
    setError(null)
    
  };
  const handleCloseDeleteModal = () => {
    setSelectedImage(null);
    setIsDelteteModalOpen(false);
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
          <Breadcrumb.Item>
          <Link to="/manager/products">
             Quản lý hình ảnh
            </Link>
          </Breadcrumb.Item>
          
      </Breadcrumb>

      {showAlert && 
        <div id="alert-border-1" className="flex items-center p-4 mb-4 text-blue-800 border-t-4 border-blue-300 bg-blue-50 dark:text-blue-400 dark:bg-gray-800 dark:border-blue-800" role="alert">
        <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
        <div className="ms-3 text-sm font-medium">
          {notification}
        </div>
        <button onClick={handleCloseAlert} type="button" className="ms-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-border-1" aria-label="Close">
          <span className="sr-only">Dismiss</span>
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
        </button>
        </div>
      }

      <div className="flex items-center justify-center w-full">
          <form onSubmit={handleUpload} >
            <label htmlFor="dropzone-file" className=" p-10 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Nhấp để tải lên hoặc kéo và thả</span></p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG ,GIF, WEBP</p>
                </div>
                <input id="dropzone-file" type="file" accept="image/*" onChange={handleImageChange} />
                {loading && <p><img className='loadding-update-icon' src={load} alt="Loading" /></p>}
                {error && <p className='text-red-600 dark:text-red-500 mt-1'>{error}</p>}
            </label>
            <button disabled={isSubmitting} type="submit" className="w-full mt-1 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Tải lên
              </button>
            </form>
       </div> 
    
    
       <p className='bg-slate-50 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/>
        </svg>
         / Danh sách hình ảnh
        </p>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-1 mx-auto max-w-screen-xl p-4'>
        {images.map((image, index) => (
            <div className="product-card " key={index}>              
               <button className='delete-image-product'   onClick={() => handleOpenDeleteModal(image.id)}>Xóa</button>
               
                <div className="product-tumb">
                        <a href="">
                            <img src={image.url} alt={`Product ${productId}`}/>
                        </a>
                </div>
            </div>
        ))}
      </div>
      
      {imgId &&
          <DeleteModalImage
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          imageId ={imgId}
          onDelete={handleDelete}
          loading ={loading}
          error ={error}
        />
      }
      

    </div>
  );
};

export default ImageManager;