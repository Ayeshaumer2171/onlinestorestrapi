import React, { useState, useEffect } from 'react';
import './Category.css';

export const Category = ({ setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllItems, setShowAllItems] = useState(false);

  useEffect(() => {
    fetch('http://localhost:1337/api/categories')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setCategories(data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);
  

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.attributes.title);
    setShowAllItems(false);
  };

  const handleShowAllItems = () => {
    setSelectedCategory(null);
    setShowAllItems(true);
  };

  return (
    <div className="container mt-5">
      {loading ? (
        <h4>Loading categories ...</h4>
      ) : error ? (
        <h3>Error: {error.message}</h3>
      ) : (
        <div className="row">
          <div
            className={`col-md-4 cat ${showAllItems ? 'active' : ''}`}
            onClick={handleShowAllItems}
          >
            Show All Items
          </div>
          {categories.map((category, index) => (
            <div
              className="col-md-4 cat"
              key={index}
              onClick={() => handleCategoryClick(category)}
            >
              {category.attributes.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
