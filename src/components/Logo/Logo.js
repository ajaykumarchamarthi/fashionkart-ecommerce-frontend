import React from "react";
import { useHistory } from "react-router-dom";
import { FcShop } from "react-icons/fc";
import classes from "./Logo.module.css";

function Logo() {
  const history = useHistory();

  function reroute() {
    history.replace("/");
  }

  return (
    <div className={classes.wrapper} onClick={reroute}>
      <FcShop className={classes.image} />
      <h2 className={classes.name}>Fashionkart</h2>
    </div>
  );
}

export default Logo;
