import React, { useState, useEffect } from "react";
import AccessoriesProductsList from "./AccessoriesProductsList";
import classes from "./Accessories.module.css";
import axios from "axios";

function Accessories() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await axios.get(
          "https://fashionkart-ecommerce.herokuapp.com/api/v1/products"
        );
        const { data } = response.data;
        setProducts(data.products);
      } catch (err) {
        console.log(err);
      }
    };
    loadProducts();
  }, []);

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
      <div className={classes.container}>{productsData}</div>
    </>
  );
}

export default Accessories;
