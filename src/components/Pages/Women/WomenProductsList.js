import React from "react";
import { useHistory } from "react-router-dom";
import classes from "./WomenProductsList.module.css";

function WomenProductsList({ id, images, name, brand, price }) {
  const history = useHistory();
  return (
    <>
      <div
        className={classes.container}
        onClick={() => history.push("/products/" + id)}
      >
        <img src={images} alt="Product images" />
        <div className={classes.card}>
          <h5 className={classes.brand}>{brand}</h5>
          <p className={classes.name}>{name}</p>
          <h4>₹ {+price}</h4>
        </div>
      </div>
    </>
  );
}

export default WomenProductsList;
