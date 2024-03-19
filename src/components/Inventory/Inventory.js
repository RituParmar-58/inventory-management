import React, { useState, useEffect } from 'react';
import EditProductModal from './../EditProductModal/EditProductModal';
import './Inventory.css'
import EditSVG from './../../assets/edit.png'
import DeleteSVG from './../../assets/delete.png'
import HideSVG from './../../assets/disable.png'
import ViewSVG from './../../assets/hide.png'
import DisableSVG from './../../assets/disabled-eye.png'
import Edit1SVG from './../../assets/disabled-edit.png'
import Delete1SVG from './../../assets/disabled-delete.png'

const Inventory = ({ mode }) => {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalStoreValue, setTotalStoreValue] = useState(0);
  const [outOfStock, setOutOfStock] = useState(0);
  const [numCategories, setNumCategories] = useState(0);;
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch('https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory');
        if (response.ok) {
          const data = await response.json();
          const productsWithDisabled = data.map(product => ({ ...product, disabled: false }));
          setProducts(productsWithDisabled);
        } else {
          console.error('Failed to fetch inventory:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };

    fetchInventory();
  }, []);


  useEffect(() => {
    let totalProductsCount = 0;
    let totalValue = 0;
    let outOfStockCount = 0;
    let categories = new Set();
    products.forEach(product => {
      totalProductsCount++;
      const value = parseFloat(product.value.replace(/\$/g, ''));
       totalValue += value;
      if (product.quantity === 0) {
        outOfStockCount++;
      }
      categories.add(product.category);
    });
    setTotalProducts(totalProductsCount);
    setTotalStoreValue(totalValue);
    setOutOfStock(outOfStockCount);
    setNumCategories(categories.size);
  }, [products]);

  const handleEdit = (product) => {
    setSelectedProduct(product);
  };

  const handleSaveEdit = (updatedProduct) => {
    setProducts(prevProducts => {
      const index = prevProducts.findIndex(product => product.id === updatedProduct.id);
      if (index !== -1) {
        const updatedProducts = [...prevProducts];
        updatedProducts[index] = updatedProduct;
        return updatedProducts;
      }
      return prevProducts;
    });
    setSelectedProduct(null);
  };
  
  const handleDelete = (productId) => {
    const indexToDelete = products.findIndex(product => product.id === productId);
    if (indexToDelete !== -1) {
      setProducts(prevProducts => {
        const updatedProducts = [...prevProducts];
        updatedProducts.splice(indexToDelete, 1);
        return updatedProducts;
      });
    }
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleDisable = (productId) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId ? { ...product, disabled: !product.disabled } : product
      )
    );
  };

  return (
    <div>
      <div className='heading bold'>Inventory stats</div>
      <div className="stats">
        <div className="stat-card">
          <p>Total Products</p>
          <h1>{totalProducts}</h1>
        </div>
        <div className="stat-card">
          <p>Total Store Value</p>
          <h1>${totalStoreValue}</h1>
        </div>
        <div className="stat-card">
          <p>Out of Stock</p>
          <h1>{outOfStock}</h1>
        </div>
        <div className="stat-card">
          <p>Number of Categories</p>
          <h1>{numCategories}</h1>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {products.map(product => (
            <tr key={product.id} className={product.disabled ? 'disabled' : ''}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.value}</td>
              {mode === 'admin' ?

              <td >
                  <img  src={EditSVG} alt='edit-icon' className='edit-icon' onClick={() => handleEdit(product)} disabled={product.disabled}/>
                  <img src={product.disabled ? ViewSVG : HideSVG} alt='disable-icon' className='edit-icon' onClick={() => handleDisable(product.id)}/> 
                  
                  <img src={DeleteSVG} alt='delete-icon' className='edit-icon' onClick={() => handleDelete(product.id)} disabled={product.disabled}/>  
                </td>
                : 
                <td >
                  <img src={Edit1SVG} alt='edit-icon' className='edit-icon' />
                  <img src={DisableSVG} alt='disable-icon' className='edit-icon'/> 
                  
                  <img src={Delete1SVG} alt='delete-icon' className='edit-icon' />  
                </td>
            }
            </tr>
          ))}
        </tbody>
      </table>
      {selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onSave={handleSaveEdit}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Inventory;
