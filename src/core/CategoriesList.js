import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from './ApiCore';

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(res => setCategories(res));
  }, []);

  return (
    <div className="card">
      <h4 className="card-header">Categories</h4>
      <ul className="list-group">
        {categories.map((category, index) => (
          <li key={index} className="list-group-item">
            <Link to={`/category/${category._id}`} className="nav-link">
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesList;
