import React, { useState, useEffect } from "react";
import MenProductsList from "./MenProductsList";
import axios from "axios";
import classes from "./Men.module.css";

function Men() {
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
      .filter((product) => product.gender === "Men")
      .map((product) => (
        <MenProductsList
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

export default Men;
