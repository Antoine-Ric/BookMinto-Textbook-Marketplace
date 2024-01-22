import React, { useState } from "react";
import "../styles/navbar.css";
import logoImage from "../assets/photo-output.jpg";

function Navbar() {
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
  const navToggle = () => {
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
    } else setActive("nav__menu");

    // Icon Toggler
    if (icon === "nav__toggler") {
      setIcon("nav__toggler toggle");
    } else setIcon("nav__toggler");
  };
  return (
    <nav className="nav">
      <a href="/" className="nav__brand">
        <img src={logoImage} alt="nav_brandlogo" />
      </a>

      <ul className={active}>
        <li className="nav__item">
          <a href="SignIn" className="nav__link">
            Sign In
          </a>
        </li>
        <li className="nav__item">/</li>
        <li className="nav__item">
          <a href="SignUp" className="nav__link">
            Sign Up
          </a>
        </li>
      </ul>
      <div onClick={navToggle} className={icon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}

export default Navbar;
