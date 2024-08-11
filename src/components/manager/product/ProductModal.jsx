import {useState, useEffect } from 'react';
import Modal from 'react-modal';
import DeleteProduct from './DeleteModalProduct';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import '../styles.css';
import * as Yup from 'yup';
import PropTypes from 'prop-types'
import load from '../../../assets/images/load.gif';
// import { tabScrollButtonClasses } from '@mui/material';
// import styled from 'styled-components';
// Cấu hình để modal gắn vào root của ứng dụng

Modal.setAppElement('#root');

const ProductModal = ({ isOpen , onClose , product, onSubmit , categorizations , categorys , loading}) => {

  
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Tên không được bỏ trống').max(100, 'Không được vượt quá 100 ký tự'),
    
    title: Yup.string().required('Tiêu đề không được bỏ trống').max(100, 'Không được vượt quá 100 ký tự'),

    barcode : Yup.string().nullable().max(30, 'Không được vượt quá 30 ký tự').matches(/^[a-z0-9]+$/, 'Chỉ được chứa các ký tự từ a-z và số'),

    slug : Yup.string()
    .required('Link không được bỏ trống')
    .min(3, 'Link tối thiểu phải là 3 ký tự')
    .max(100, 'Không được vượt quá 100 ký tự')
    .test(
      'no-spaces',
      'Slug chuỗi không được chứa khoảng trắng',
      (value) => !/\s/.test(value) // Kiểm tra không có khoảng trắng
    )
    .matches(/^[a-z0-9-]+$/, 'Chỉ được chứa các ký tự từ a-z, số và dấu -') ,

    price : Yup.number()
    .min(100, 'Giá trị phải lớn hơn 100') // Giá trị tối thiểu là 1001
    .max(100000000, 'Giá trị phải nhỏ hơn 100000000') // Giá trị tối đa là 4999
    .required('Giá vốn không được để trống'), // Trường không được bỏ trống
    
    retailPrice : Yup.number() 
    .min(100, 'Giá trị phải lớn hơn 100') // Giá trị tối thiểu là 1001
    .max(100000000, 'Giá trị phải nhỏ hơn 100000000') // Giá trị tối đa là 4999
    .required('Giá bán không được bỏ trống'), // Trường không được bỏ trống
    
    description : Yup.string().nullable().max(135, 'Mô tả Không được vượt quá 135 ký tự'),
  
    
  });

  
  var [titleFrom, setTitleFrom] = useState('');

  const [selectedIdCategorization, setSelectedIdCategorization] = useState('');
  const [selectedIdCategory, setSelectedIdCategory] = useState('');
  const [initialValues, setInitialValues] = useState({
    name: '',
    title: '',
    price: 0,
    retailPrice: 0,
    description:'',
    barcode:'',
    slug:'',
    category : '',
    categorization: '',
   
  });

  const handleChangeCategorization = (event) => {
    setSelectedIdCategorization(event.target.value);
    
  };

  const handleChangeCategory = (event) => {
    setSelectedIdCategory(event.target.value);
    
  };
  
  useEffect(() => {
    
      if (product!= null) {
        
        setInitialValues(product);
        setTitleFrom('Chỉnh sửa sản phẩm');
        setSelectedIdCategorization(product.idCategorization)


      }
      else
      {
        setInitialValues(
        {
          name: '',
          title: '',
          price: 0,
          retailPrice: 0,
          description:'',
          slug:'',
          barcode:'',
          category : '',         
          categorization: '',
        });

          setTitleFrom('Tạo sản phẩm');
      }
    }, [product]);

    

    const handleSubmit = async (values, { setSubmitting, setErrors, resetForm }) => {
      // e.preventDefault();

      
      debugger

      const updatedProduct = {
        
        id : product ? product.id : undefined,
        name : values.name,
        slug : values.slug || undefined,
        title : values.title,
        price: parseFloat(values.price),
        retailPrice: parseFloat(values.retailPrice),
        idCategory : selectedIdCategory || undefined,
        barcode : values.barcode || undefined,
        idCategorization: selectedIdCategorization ||  undefined,
        description : values.description,
      };
      debugger
      // Gọi hàm cập nhật sản phẩm
     await onSubmit(updatedProduct);
      resetForm();
      onClose();
    };

   
  return (
      
    <Modal className='modal-overlay'
    style={{
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.50)',
        // zIndex: 10001, // Thiết lập z-index cho overlay
      },
      content: {
        // width: '50%',
        // top: '50%',
        // left: '50%',
        // right: 'auto',
        // bottom: 'auto',
        // marginRight: '-50%',
        // transform: 'translate(-50%, -50%)',
        // zIndex: 10001, // Thiết lập z-index cho nội dung modal
      },
      
    }}
     isOpen={isOpen} onRequestClose={onClose} 
     contentLabel="Update Product">
      
      <p className='title-from flex items-center'>
      <svg className="w-[25px] h-[25px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
      </svg>
        <span>{titleFrom}</span>
      </p>
      
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className='grid  gap-2 md:grid-cols-2'>
                <div className="relative z-0 w-full mb-5 group">
                    <Field type="text"
                     name="name"     
                     className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                     placeholder=" "

                     />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tên</label>
                    <ErrorMessage className=" text-sm text-red-600 dark:text-red-500" name="name" component="p" />
                </div>
             
                <div className="relative z-0 w-full mb-5 group">
                    <Field type="text"
                     name="title"     
                     className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                     placeholder=" "
                    
                     />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tiêu đề</label>
                    <ErrorMessage className=" text-sm text-red-600 dark:text-red-500" name="title" component="p" />
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <Field type="text"
                     name="slug"     
                     className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                     placeholder=" "
                   
                     />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Link</label>
                    <ErrorMessage className=" text-sm text-red-600 dark:text-red-500" name="slug" component="p" />
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <Field type="text"
                     name="barcode"     
                     className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                     placeholder=" "
                     />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mã vạch</label>
                    <ErrorMessage className=" text-sm text-red-600 dark:text-red-500" name="barcode" component="p" />
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <Field 
                     type="number"
                     name="price"     
                     className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                     placeholder=" "
                     />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Giá vốn</label>
                    <ErrorMessage className=" text-sm text-red-600 dark:text-red-500" name="price" component="p" />
                </div>
            
                <div className="relative z-0 w-full mb-5 group">
                    <Field type="number"
                     name="retailPrice"     
                     className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                     placeholder=" "
                     />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Giá bán</label>
                    <ErrorMessage className=" text-sm text-red-600 dark:text-red-500" name="retailPrice" component="p" />
                </div>
                <div className='from-input'>
                  <label className="block text-sm  text-gray-500 dark:text-white" >Danh mục</label>
                  <Field as="select" value={selectedIdCategory || ""}  onChange={handleChangeCategory} id="category" 
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      name="category">
                        
                    <option value="" label="---" />
                
                    {categorys.map(option => (
                          <option key={option.id} value={option.id} label={option.name}/>      
                    ))}
                 
                  </Field>
                  <ErrorMessage className="text-sm text-red-600 dark:text-red-500" component="p"  name="category"/>
              </div>

              <div className='from-input'>
                  <label className="block text-sm text-gray-500 dark:text-white" >Phân loại</label>
                  <Field as="select" value={selectedIdCategorization || ""} onChange={handleChangeCategorization} id="categorization" 
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      name="categorization"
                      >
                        
                    <option value="" label="---" />
                    {categorizations.map(option => (
                          <option key={option.id} value={option.id} label={option.name}/>      
                    ))}
                 
                  </Field>
                  <ErrorMessage className="text-sm text-red-600 dark:text-red-500" component="p"  name="categorization"/>
              </div>
                <div className='from-input'>                 
                  <label className="block text-sm font-medium text-gray-900 dark:text-white">Mô tả</label>
                  <Field 
                  as="textarea" rows="4" 
                  name = "description"             
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mô tả tối đa là 135 ký tự ..."
                  
                  />
                <ErrorMessage className=" text-sm text-red-600 dark:text-red-500" name="description" component="p" />
              
           
              </div>
          </div>
               
          <button className="mt-5 mr-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit" disabled={isSubmitting} >Cập nhật</button>
                  <button className=' text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' type="button" onClick={onClose}>
                    Đóng
          </button>
          
          {loading && <img className='loadding-update-icon' src={load} alt="Loading" />}
        </Form>
        )}
      </Formik>

    </Modal>

  );
};

ProductModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose  :PropTypes.func,
  product : PropTypes.object,
  onSubmit :  PropTypes.func,
  categorizations: PropTypes.arrayOf(PropTypes.shape({ // Kiểu mảng của các đối tượng
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })),
  categorys: PropTypes.arrayOf(PropTypes.shape({ // Kiểu mảng của các đối tượng
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })),
  loading: PropTypes.bool.isRequired,
  error : PropTypes.string
};


export default ProductModal;