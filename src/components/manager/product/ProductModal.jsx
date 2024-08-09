import {useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import '../styles.css';
import * as Yup from 'yup';
// import styled from 'styled-components';
// Cấu hình để modal gắn vào root của ứng dụng
Modal.setAppElement('#root');

const ProductModal = ({ isOpen, onClose, product, onSubmit }) => {


  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Tên không được bỏ trống'),
    title: Yup.string().required('Tiêu đề không được bỏ trống'),
    slug : Yup.string()
    .required('Slug không được bỏ trống')
    .min(3, 'Slug tối thiểu phải là 3 ký tự')
    .test(
      'no-spaces',
      'Slug chuỗi không được chứa khoảng trắng',
      (value) => !/\s/.test(value) // Kiểm tra không có khoảng trắng
    )
    .matches(/^[a-z0-9-]+$/, 'Chỉ được chứa các ký tự từ a-z, số và dấu -') 
    // Kiểm tra chỉ chứa a-z, 0-9 và dấu -\ 
    // email: Yup.string().email('Invalid email address').required('Email is required'),
    // age: Yup.number()
    //   .min(18, 'Age must be at least 18')
    //   .max(99, 'Age must be less than 99')
    //   .required('Age is required'),
    
  });

  var [titleFrom, setTitleFrom] = useState('');

  const [initialValues, setInitialValues] = useState({
    name: '',
    title: '',
    price: '',
    description:'',
    slug:''
  });

  
  

  useEffect(() => {
    
      if (product!= null) {
        // setName(product.name);
        // setTitle(product.title);
        // setPrice(product.price);
        // setDescription(product.description);
        // setSlug(product.slug);

        setInitialValues(product);
        setTitleFrom('Chỉnh sửa sản phẩm');

        debugger
      }
      else
      {
        setInitialValues(
          {name: '',
          title: '',
          price: '',
          description:'',
          slug:''});

          setTitleFrom('Tạo sản phẩm');
      }
     

    }, [product]);

    

    const handleSubmit = (values, { setSubmitting, setErrors }) => {
      // e.preventDefault();

      const updatedProduct = {
        
        id : product ? product.id : undefined,
        name : values.name,
        slug : values.slug,
        title : values.title,
        price: parseFloat(values.price),
        description : values.description,
      };

      
      // Gọi hàm cập nhật sản phẩm
      onSubmit(updatedProduct);

      // Đóng modal sau khi cập nhật
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
            <div className='from-input'>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên</label>
                <Field type="text"                     
                        name="name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        
                />
              <ErrorMessage className="mt-2 text-sm text-red-600 dark:text-red-500" name="name" component="p" />
            </div>

            <div className='from-input'>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tiêu đề</label>
              <Field  type="text"
                      name ="title"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                       />
              <ErrorMessage className="mt-2 text-sm text-red-600 dark:text-red-500"  name="title" component="div" />
            </div>

            <div className='from-input'>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Slug</label>
              <Field  type="text"                      
                      name="slug"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"       
                       />
              <ErrorMessage className="mt-2 text-sm text-red-600 dark:text-red-500" name="slug" component="div" />
            </div>

            <div className='from-input'>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Giá nhập</label>
              <Field  type="number"
                      name ="price"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                      />
              <ErrorMessage className="mt-2 text-sm text-red-600 dark:text-red-500" name="pirce" component="div" />
            </div>
            
            <button className="mt-5 mr-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit" disabled={isSubmitting} >Cập nhật</button>
              <button className=' text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' type="button" onClick={onClose}>
                Đóng
              </button>
           
          </Form>
        )}
      </Formik>

    </Modal>




      // <form onSubmit={handleSubmit}>
      //   <input
      //     type="text"
      //     placeholder="Name"
      //     value={name}
      //     onChange={(e) => setName(e.target.value)}
      //     required
      //   />

      //   <input
      //     type="title"
      //     placeholder="Title"
      //     value={title}
      //     onChange={(e) => setTitle(e.target.value)}
      //     required
      //   />
      //   <input
      //     type="number"
      //     placeholder="Price"
      //     value={price}
      //     onChange={(e) => setPrice(e.target.value)}
      //     required
      //   />

      //   <input
      //     type="slug"
      //     placeholder="slug"
      //     value={slug}
      //     onChange={(e) => setSlug(e.target.value)}
      //     required
      //   />
      //   <input
      //     type="text"
      //     placeholder="Description"
      //     value={description}
      //     onChange={(e) => setDescription(e.target.value)}
      //     required
      //   />
      //   <button className="mr-5" type="submit">Cập nhật</button>

      //   <button type="button" onClick={onClose}>
      //     Đóng
      //   </button>
      // </form>
  );
};

export default ProductModal;