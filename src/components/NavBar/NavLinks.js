import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./NavBar.module.css";

export function NavLinks(props) {
  const authCtx = useContext(AuthContext);

  return (
    <ul>
      <li onClick={() => props.isMobile && props.closeMobileMenu()}>
        <NavLink activeClassName={classes.active} to="/men">
          Men
        </NavLink>
      </li>
      <li onClick={() => props.isMobile && props.closeMobileMenu()}>
        <NavLink activeClassName={classes.active} to="/women">
          Women
        </NavLink>
      </li>
      <li onClick={() => props.isMobile && props.closeMobileMenu()}>
        <NavLink activeClassName={classes.active} to="/accessories">
          Accessories
        </NavLink>
      </li>
      {authCtx.isLoggedIn && (
        <li onClick={() => props.isMobile && props.closeMobileMenu()}>
          <NavLink activeClassName={classes.active} to="/orders">
            Orders
          </NavLink>
        </li>
      )}
      {!authCtx.isLoggedIn && (
        <button className={classes.btn}>
          <NavLink to="/signup">
            <span>Sign Up</span>
          </NavLink>
        </button>
      )}
      {authCtx.isLoggedIn && (
        <button className={classes.btn} onClick={() => authCtx.logout()}>
          <span>Log Out</span>
        </button>
      )}
    </ul>
  );
}

export default NavLinks;
