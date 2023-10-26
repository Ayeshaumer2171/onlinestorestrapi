import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Product.css';

const Product = ({ selectedCategory }) => {
 const [products, setProducts] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);

 
useEffect(() => {
let apiUrl = 'http://localhost:1337/api/products?populate=*';

if (selectedCategory) {
  apiUrl += `&filters[category][title]=${selectedCategory}`;
} 
  console.log("apiUrl: ", apiUrl);
  axios
  .get(apiUrl)
  .then((res) => {
    setProducts(res.data.data)
    setLoading(false); 
  })
  .catch((error) => {
    setError(error);
    setLoading(false); 
  });
  }, [selectedCategory]);

 console.log("selectedCategory", selectedCategory)
 console.log("products", products);



return (
<div className="container mt-5">
  <div className="row">
    {error?(
          <div>Error: {error.message}</div>
        ):(
    
    products.length > 0 ? (
      products.map((product) => (
        <div className="col-md-4 cats" key={product.id}>
          <Link to={`/products/${product.id}`} className="product-link">
            <div className="card mb-4">
              {product.attributes.image &&
              product.attributes.image.data &&
              product.attributes.image.data.length > 0 ? (
                <img
                  src={`http://localhost:1337${product.attributes.image.data[0].attributes.url}`}
                  alt={product.attributes.title}
                  className="card-img-top"
                />
              ) : (
                <div className="placeholder-image">No Image Available</div>
              )} 
              <div className="card-body">
                <h5 className="card-title">{product.attributes.title}</h5>
                <p className="card-text">Description: {product.attributes.description}</p>
                <p className="card-text card_price">Price: ${product.attributes.price}</p>
   
              </div>
            </div>
          </Link>
        </div>
      ))
    ) : (
      <h2>Loading products...</h2>
    )
        )
  }
  </div>

</div>
);
};

export default Product;