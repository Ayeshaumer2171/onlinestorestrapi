import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductManagement from './Admin';
import axios from 'axios';

   const ProductDetails = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  


useEffect(() => {

    console.log('Fetching product details for ID:', id);

    axios.get(`http://localhost:1337/api/products/${id}?populate=*`)
      .then((res) => setProduct(res.data.data))
      .catch((error) => console.error('Error fetching data:', error));
 
    }, [id]);

   


  return (
    <div className="container mt-5">
      {product ? (
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
              {product.attributes.image && product.attributes.image.data && product.attributes.image.data.length > 0 ? (
                <img
                  src={`http://localhost:1337${product.attributes.image.data[0].attributes.url}`}
                  alt={product.attributes.title}
                  className="card-img-top cards"
                />
              ) : (
                <div className="placeholder-image">No Image Available</div>
              )}

            </div>
          </div>
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{product.attributes.title}</h5>
                <p className="card-text">Description: {product.attributes.description}</p>
                <p className="card-text cardPrice" style={{ fontSize: '25px', fontWeight: '700' }}>Price: $ {product.attributes.price}</p>

                <button className="btn btn-primary mt-3" onClick={() =>addToCart(product)}>
                  Add to cart
                </button>
              </div>
            </div>                                    
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}





    </div> 
    
    
  );
};

export default ProductDetails;
