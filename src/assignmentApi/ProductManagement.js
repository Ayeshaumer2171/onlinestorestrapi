import React, { useState, useEffect } from 'react';
import axios from 'axios';

  const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  console.log("products: ", products);
  const [error, setError] = useState(null);
  const [newProduct, setNewProduct] = useState({ title: '', description: '', price: 0});
  const [productToEdit, setProductToEdit] = useState(null);

  useEffect(() => {
    const apiUrl = 'http://localhost:1337/api/products?populate=*';

    axios
      .get(apiUrl)
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  const handleDelete = (productId) => {
    axios
      .delete(`http://localhost:1337/api/products/${productId}`)
      .then(() => {
        setProducts(products.filter((product) => product.id !== productId));
      })
      .catch((error) => {
        setError(error);
      });
  };

  const handleEdit = (product) => {
    setProductToEdit(product);
  };
  
  //create product 
  const handleCreate = (event) => {
    event.preventDefault();
    console.log("Creating product:", newProduct);

    const { title, description, price } = newProduct; 

    const newProductData = {
      data: {

          title: title,
          description: description,
          price: parseFloat(price),
      },
    };
    console.log("Sending data to the server:", newProductData); 
// {data: {}}
    axios
      .post('http://localhost:1337/api/products', newProductData)

      .then((response) => {
        console.log("Create Product Response:", response.data);
        
        const newProductData = response.data.data; 
        setProducts([...products, newProductData]);
        setNewProduct({ title: '', description: '', price: 0 });
      })   
          
      .catch((error) => {
        setError(error);
        console.error('Error creating product:', error);
      });
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    console.log("Product to edit:", productToEdit);
  
    if (productToEdit) {
      const { title, description, price } = productToEdit.attributes;
      console.log("Updating with data:", { title, description, price });
  
      axios
        .put(`http://localhost:1337/api/products/${productToEdit.id}`, {
          data: {
              title: title,
              description: description,
              price: price,
            },
        })
        .then((response) => {
          const updatedProduct = response.data.data;
          console.log("Updated Product:", updatedProduct);
          const updatedProducts = products.map((product) => {
            if (product.id === productToEdit.id) {
              return updatedProduct;
            }
            return product;
          });
          setProducts(updatedProducts);
          setProductToEdit(null);
        })
        .catch((error) => {
          setError(error);
          console.error('Error updating product:', error);
        });
    }
  };
  
  return (
    <div>
      <h2>Product Management</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.attributes.title}</td>
              <td>{product.attributes.description}</td>
              <td>${product.attributes.price}</td>
              <td>
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {productToEdit && (
        <div>
          <h3>Edit Product</h3>
          <form>
            <label>Title:
              <input
                type="text"
                value={productToEdit.attributes.title}
                onChange={(e) => {
                  const updatedTitle = e.target.value;
                  setProductToEdit({
                    ...productToEdit,
                    attributes: { ...productToEdit.attributes, title: updatedTitle },
                  });
                }}
              />
            </label>
            <label>Description:
              <input
                type="text"
                value={productToEdit.attributes.description}
                onChange={(e) => {
                  const updatedDescription = e.target.value;
                  setProductToEdit({
                    ...productToEdit,
                    attributes: { ...productToEdit.attributes, description: updatedDescription },
                  });
                }}
              />
            </label>
            <label>Price:
              <input
                type="number"
                value={productToEdit.attributes.price}
                onChange={(e) => {
                  const updatedPrice = parseFloat(e.target.value);
                  setProductToEdit({
                    ...productToEdit,
                    attributes: { ...productToEdit.attributes, price: updatedPrice },
                  });
                }}
              />
            </label>
            <button onClick={handleUpdate}>Update Product</button>
          </form>
        </div>
      )}

      <div>
        <h3>Create Product</h3>
        <form>
          <label>Title:
            <input
              type="text"
              value={newProduct.title}
              onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
            />
          </label>
          <label>Description:
            <input
              type="text"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            />
          </label>
          <label>Price:
            <input
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
          </label>
          <button onClick={handleCreate}>Create Product</button>
        </form>
      </div>
    </div>
  );
};

export default ProductManagement;
