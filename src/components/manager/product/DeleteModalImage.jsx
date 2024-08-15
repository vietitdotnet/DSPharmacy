import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import PropTypes from 'prop-types'
import load from '../../../assets/images/load.gif';
// isOpen={isDeleteModalOpen}
// product={selectedProduct}
// loading ={loading}
// onSubmit ={onDelete}

function DeleteModalImage({isOpen , onClose , imageId, onDelete, loading, error}) {
    
 
    const handleDelete = async () => {  
        debugger 
      await onDelete(imageId);
    };


  return (
    <>
      <Modal show={isOpen} size="md" onClose={() => onClose} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
               Xác nhận xóa hình ảnh
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
                {"Xóa"}
              </Button>
              <Button color="gray" onClick={onClose}>
                {"Thoắt"}
              </Button>
              <p>{loading && <img className='loadding-update-icon' src={load} alt="Loading" />}</p>
            </div>
            {error && <p className='text-red-600 dark:text-red-500 mt-1'>{error}</p>}
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

DeleteModalImage.propTypes = {

  isOpen: PropTypes.bool.isRequired,
  onClose  :PropTypes.func,
  imageId : PropTypes.number,
  onSubmit :  PropTypes.func,
  onDelete :  PropTypes.func,
  loading: PropTypes.bool.isRequired,
  error : PropTypes.string
}

export default DeleteModalImage
