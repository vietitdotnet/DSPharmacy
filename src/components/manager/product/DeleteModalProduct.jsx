import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import PropTypes from 'prop-types'
// isOpen={isDeleteModalOpen}
// product={selectedProduct}
// loading ={loading}
// onSubmit ={onDelete}

function DeleteModalProduct({isOpen , onClose , onDelete, product, loading , onSubmit}) {
    
  const [openModal, setOpenModal] = useState(true);

    const handleDelete = async () => {   
      onDelete(product.id);
      onClose();
    };


  return (
    <>
      <Modal show={isOpen} size="md" onClose={() => onClose} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={onClose}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

DeleteModalProduct.propTypes = {

  isOpen: PropTypes.bool.isRequired,
  onClose  :PropTypes.func,
  product : PropTypes.object,
  onSubmit :  PropTypes.func
}

export default DeleteModalProduct

