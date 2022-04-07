import React, { useState } from "react";
import NavLinks from "./NavLinks";
import classes from "./NavBar.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  const hamburgerIcon = (
    <GiHamburgerMenu
      className={classes.HamburgerMenu}
      size="30px"
      color="white"
      onClick={() => setIsOpen(!isOpen)}
    />
  );

  const closeMobileMenu = () => setIsOpen(false);

  const closeIcon = (
    <AiOutlineClose
      className={classes.HamburgerMenu}
      size="30px"
      color="white"
      onClick={() => setIsOpen(!isOpen)}
    />
  );
  return (
    <nav className={classes.MobileNavigation}>
      {isOpen ? closeIcon : hamburgerIcon}
      {isOpen && <NavLinks isMobile={true} closeMobileMenu={closeMobileMenu} />}
    </nav>
  );
}

export default MobileNavigation;
