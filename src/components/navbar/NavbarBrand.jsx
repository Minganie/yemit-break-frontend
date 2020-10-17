import React from "react";
import { Link } from "react-router-dom";

function NavbarBrand({ onToggle }) {
  return (
    <div className="navbar-brand">
      <img
        className="navbar-item"
        src="logo192.png"
        alt="The League"
        width="65"
      />
      <Link className="navbar-item" to="/all-toons">
        Yemit Break
      </Link>
      <a
        role="button"
        className="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarMenu"
        onClick={onToggle}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>
  );
}

export default NavbarBrand;
