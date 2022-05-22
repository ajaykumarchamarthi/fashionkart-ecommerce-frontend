import React, { useState, useEffect } from "react";
import AccessoriesProductsList from "./AccessoriesProductsList";
import { useHistory, useLocation } from "react-router-dom";
import classes from "./Accessories.module.css";
import axios from "axios";

function Accessories() {
  const [products, setProducts] = useState([]);

  const history = useHistory();
  const location = useLocation();

  const sortBy = location.search;

  const queryChangeHandler = (event) => {
    event.preventDefault();
    const sortBy = event.target.value;
    history.push({
      pathname: "/accessories",
      search: `?sort=${sortBy}`,
    });
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await axios.get(
          `https://fashionkart-ecommerce.herokuapp.com/api/v1/products${sortBy}`
        );
        const { data } = response.data;
        setProducts(data.products);
      } catch (err) {
        console.log(err);
      }
    };
    loadProducts();
  }, [sortBy]);

  let productsData;

  if (products.length > 0) {
    productsData = products
      .filter((product) => product.gender === "Unisex")
      .map((product) => (
        <AccessoriesProductsList
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
        <h3 className={classes.title}>Accessories</h3>
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

export default Accessories;
