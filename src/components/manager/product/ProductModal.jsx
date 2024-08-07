import {useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import * as Yup from 'yup';
// Cấu hình để modal gắn vào root của ứng dụng
Modal.setAppElement('#root');

const ProductModal = ({ isOpen, onClose, product, onSubmit }) => {


  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Username is required'),
    title: Yup.string().required('title is required'),
    slug : Yup.string().required('slug is required').min(3, "slug  must be at least 3").required('slug is required')
    // email: Yup.string().email('Invalid email address').required('Email is required'),
    // age: Yup.number()
    //   .min(18, 'Age must be at least 18')
    //   .max(99, 'Age must be less than 99')
    //   .required('Age is required'),
    
  });

  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [slug, setSlug] = useState('');


  const [initialValues, setInitialValues] = useState({
    name: '',
    title: '',
    price: '',
    description:'',
    slug:''
  });




  useEffect(() => {
    
    if (product) {
      // setName(product.name);
      // setTitle(product.title);
      // setPrice(product.price);
      // setDescription(product.description);
      // setSlug(product.slug);

      setInitialValues(product);
    }
  }, [product]);

  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    // e.preventDefault();


    // Tạo đối tượng sản phẩm cập nhật
    const updatedProduct = {
      id : product ? product.id : undefined,
      name,
      slug,
      title,
      price: parseFloat(price),
      description,
    };

    
    // Gọi hàm cập nhật sản phẩm
    onSubmit(updatedProduct);

    // Đóng modal sau khi cập nhật
    onClose();
  };

  return (
      
    
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Update Product">
      
      <h2>Update Product</h2>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
                <label>Tên</label>
                <Field type="text"                     
                        name="name"
                        
                />
              <ErrorMessage name="name" component="div" />
            </div>

            <div>
              <label>Tiêu đề</label>
              <Field  type="text"
                      name ="title"
                     
                       />
              <ErrorMessage name="title" component="div" />
            </div>

            <div>
              <label>Slug</label>
              <Field  type="text"                      
                      name="slug"
                              
                       />
              <ErrorMessage name="slug" component="div" />
            </div>

            <div>
              <label>Giá nhập</label>
              <Field  type="number"
                      name ="price"
                         
                      />
              <ErrorMessage name="pirce" component="div" />
            </div>

            <button className="mr-5" type="submit" disabled={isSubmitting} >Cập nhật</button>
              <button type="button" onClick={onClose}>
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