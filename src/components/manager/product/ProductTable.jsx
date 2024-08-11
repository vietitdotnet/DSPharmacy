
const ProductTable = ({ products , onUpdate , onDelete }) => {

  
//   const handleDelete = async (id) => {
    
//     onDelete(id, products);
//   };

  return (
   
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                    Tên
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Giá
                    </th>
                    
                    <th scope="col" className="px-6 py-3">
                    Tùy chọn
                    </th>
                </tr>
            </thead>
            <tbody>
                { products.map((product, index) => (
                    <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {product.name}
                        </th>
                        <td className="px-6 py-4">
                            {product.price}
                        </td>
                    
                        <td className="px-6 py-4">
                            <button className=" font-medium text-blue-600 dark:text-blue-500 mr-3" onClick={() => onUpdate(product)}>Sửa</button>
                            
                            <a onClick={() => onDelete(product)} className=" font-medium text-blue-600 dark:text-blue-500 ">Xóa</a>
                        </td>
                    </tr>
                ))}
                
            </tbody>
        </table>
    </div>
    
  );
};

export default ProductTable;