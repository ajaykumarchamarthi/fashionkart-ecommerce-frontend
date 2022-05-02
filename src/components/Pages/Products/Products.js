import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductsList from "./ProductsList";

import classes from "./Products.module.css";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const response = await axios.get(
        "https://fashionkart-ecommerce.herokuapp.com/api/v1/products"
      );
      const { data } = response.data;
      setProducts(data.products);
    };

    loadProducts();
  }, []);

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
      <div className={classes.container}>{productsData}</div>
    </>
  );
}

export default Products;
