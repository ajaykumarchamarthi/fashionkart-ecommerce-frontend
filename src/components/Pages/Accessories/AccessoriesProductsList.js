import React from "react";
import { useHistory } from "react-router-dom";
import classes from "./AccessoriesProductsList.module.css";

function AccessoriesProductsList({ id, images, name, brand, price }) {
  const history = useHistory();
  return (
    <>
      <div
        className={classes.container}
        onClick={() => history.push("/products/" + id)}
      >
        <img src={images[0]} alt="Product images" />
        <div className={classes.card}>
          <h5 className={classes.brand}>{brand}</h5>
          <p className={classes.name}>{name}</p>
          <h4>₹ {+price}</h4>
        </div>
      </div>
    </>
  );
}

export default AccessoriesProductsList;
