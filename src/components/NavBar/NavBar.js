import React from "react";
import Navigation from "./Navigation";
import MobileNavigation from "./MobileNavigation";
import classes from "./NavBar.module.css";
import Logo from "../Logo/Logo";
import HeaderCartButton from "./Layout/HeaderCartButton";

function NavBar(props) {
  return (
    <div className={classes.NavBar}>
      <Logo />
      <Navigation />
      <HeaderCartButton onClick={props.showCart} />
      <MobileNavigation />
    </div>
  );
}

export default NavBar;
