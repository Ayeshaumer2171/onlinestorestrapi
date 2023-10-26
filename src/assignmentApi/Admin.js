import React, { useState } from 'react';
import axios from 'axios';
//<ProductManagement
// onProductCreated={handleProductCreated}
// onProductUpdated={handleProductUpdated}
// onProductDeleted={handleProductDeleted}
// productIdToDelete={productIdToDelete}
// productIdToUpdate={productIdToUpdate}
// />
// const handleProductCreated = (createdProduct) => {
// };
// const handleProductUpdated = (productId, updatedProduct) => {
// };

// const handleProductDeleted = (productId) => {
//   setProductIdToDelete(productId);
// };
//const [productIdToDelete, setProductIdToDelete] = useState(null);
//const [productIdToUpdate, setProductIdToUpdate] = useState(null);
  

const Admin = ({ onProductCreated, onProductUpdated, onProductDeleted }) => {
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: 0,
  });

  const [updatedProduct, setUpdatedProduct] = useState({
    title: '',
    description: '',
    price: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:1337/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: newProduct }),
      });
      if (response.ok) {
        const createdProduct = await response.json();
        console.log('Product created:', createdProduct);
        onProductCreated(createdProduct);
      } else {
        const errorMessage = await response.text();
        console.error('Failed to create the product:', errorMessage);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdate = async (productId) => {
    try {
      const response = await axios.put(`http://localhost:1337/api/products/${productId}`, updatedProduct);
      if (response.status === 200) {
        const updatedProductData = response.data.data;
        console.log('Product updated:', updatedProductData);
        onProductUpdated(productId, updatedProductData);
      } else {
        console.error('Failed to update the product.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:1337/api/products/${productId}`);
      if (response.status === 200) {
        console.log('Product deleted successfully.');
        onProductDeleted(productId);
      } else {
        console.error('Failed to delete the product.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="product-management">
      <h1>Create a New Product</h1>
      <form onSubmit={handleSubmit} className="create-form">
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={newProduct.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Create Product</button>
      </form>

      <h1>Edit Product</h1>
      <form className="update-form">
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={updatedProduct.title}
            onChange={handleUpdateInputChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={updatedProduct.description}
            onChange={handleUpdateInputChange}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={updatedProduct.price}
            onChange={handleUpdateInputChange}
            required
          />
        </div>
        <button type="submit">Update Product</button>
      </form>

      <button onClick={() => handleDelete(productIdToDelete)}>Delete Product</button>
    </div>
  );
};

export default Admin;
