import React from "react";
import { Link } from "react-router-dom";
import NavbarDropdown from "./NavbarDropdown";

function NavbarMenu({ user, toons, fights, isOpen }) {
  return (
    <div className={`navbar-menu ${isOpen ? "is-active" : ""}`} id="navbarMenu">
      <div className="navbar-start">
        <Link className="navbar-item" to="/all-toons">
          All The Toons
        </Link>
        {user && (
          <NavbarDropdown
            user={user}
            label="Toons"
            link="/my-toon"
            list={toons}
          />
        )}
        <NavbarDropdown
          user={user}
          label="Fights"
          link="/fight"
          list={fights}
        />
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            {!user && (
              <Link className="button is-light" to="/login">
                Login
              </Link>
            )}
            {!user && (
              <Link className="button is-primary" to="/register">
                Register
              </Link>
            )}
            {user && (
              <Link className="button is-primary" to="/logout">
                Logout
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarMenu;
