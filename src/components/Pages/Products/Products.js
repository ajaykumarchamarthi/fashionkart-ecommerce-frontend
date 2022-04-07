import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductsList from "./ProductsList";
// import ErrorModal from "../../../UI/ErrorModal";
import classes from "./Products.module.css";

function Products() {
  const [products, setProducts] = useState([]);
  // const [error, setError] = useState();

  // const errorHandler = () => {
  //   setError(false);
  // };

  useEffect(() => {
    const loadProducts = async () => {
      const response = await axios.get(
        "https://pacific-mesa-21424.herokuapp.com/api/v1/products"
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
      {/* {error && (
        <ErrorModal
          title="Error Occured!"
          message="ErrorOccured"
          onConfirm={errorHandler}
        />
      )} */}
      <div className={classes.container}>{productsData}</div>
    </>
  );
}

export default Products;
