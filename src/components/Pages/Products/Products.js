import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import ProductsList from "./ProductsList";

import classes from "./Products.module.css";

function Products() {
  const [products, setProducts] = useState([]);

  const history = useHistory();
  const location = useLocation();

  const sortBy = location.search;

  const queryChangeHandler = (event) => {
    event.preventDefault();
    const sortBy = event.target.value;
    console.log(sortBy);
    history.push({
      search: `?sort=${sortBy}`,
    });
  };

  useEffect(() => {
    console.log("rendered");
    const loadProducts = async () => {
      const response = await axios.get(
        `https://fashionkart-ecommerce.herokuapp.com/api/v1/products${sortBy}`
      );
      const { data } = response.data;
      setProducts(data.products);
    };

    loadProducts();
  }, [sortBy]);

  let productsData;

  if (products.length > 0) {
    productsData = products.map((product) => (
      <ProductsList
        key={product._id}
        id={product._id}
        description={product.description}
        images={product.images}
        name={product.name}
        brand={product.brand}
        price={product.price}
      />
    ));
  }

  return (
    <>
      <div className={classes.products}>
        <h3 className={classes.title}>Products</h3>
        <div className={classes.sortContainer}>
          <div className={classes.options}>
            <label htmlFor="sortby">Sort By</label>
            <select name="sortby" id="sortby" onChange={queryChangeHandler}>
              <option value="-createdAt">Created At</option>
              <option value="price">Price - Low to Hight</option>
              <option value="-price">Price - Hight to Low</option>
            </select>
          </div>
        </div>
      </div>
      <div className={classes.container}>{productsData}</div>
    </>
  );
}

export default Products;
