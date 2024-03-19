import React, { useState } from 'react';
import './EditProductModal.css'

const EditProductModal = ({ product, onSave, onClose }) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = () => {
    onSave(editedProduct);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Edit Product: {product.name}</h2>
        <label>Category:</label>
        <input type="text" name="category" value={editedProduct.category} onChange={handleChange} />
        <label>Price:</label>
        <input type="text" name="price" value={editedProduct.price} onChange={handleChange} />
        <label>Quantity:</label>
        <input type="text" name="quantity" value={editedProduct.quantity} onChange={handleChange} />
        <label>Value:</label>
        <input type="text" name="value" value={editedProduct.value} onChange={handleChange} />
        <div className="button-container">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;


