import {useParams }  from "react-router-dom"
import dataList from '../constant/data';


const DetailProductPage = () => {

    
    const { slug } = useParams();
  
      const product = dataList.find(item => item.slug == slug)
    
          
    
    if (!product) {
        return <div>Loading...</div>;
      }
  
    return (
        <div className="items-center  max-w-screen-xl mx-auto p-4">
            Detial
        </div>
    );

  };

export default DetailProductPage;