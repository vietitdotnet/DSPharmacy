import axios from 'axios';

const API_URL = 'http://localhost:5193/api/managerapi/product'; // Địa chỉ của API

const API_Categorization = 'http://localhost:5193/api/managerapi/categorization'; // Địa chỉ của API Categorization

const API_Category = 'http://localhost:5193/api/managerapi/category'; // Địa chỉ của API Category

const headerProducts = {
    'Content-Type': 'application/json',
}
// const headerCategorization = {
//     'Content-Type': 'application/json',
// }
export const getProducts = () => axios.get(API_URL);

export const getProduct = (id) => axios.get(`${API_URL}/${id}`);

export const createProduct = (product) => axios.post(API_URL, product, headerProducts);

export const updateProduct = (id, product) => axios.put(`${API_URL}/${id}`, product, headerProducts);

export const deleteProduct = (id) => axios.delete(`${API_URL}/${id}`);


export const getCategorizations = () => axios.get(API_Categorization);


export const getCategorys = () => axios.get(API_Category);

