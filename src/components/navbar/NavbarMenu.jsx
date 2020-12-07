import React from "react";
import { Link } from "react-router-dom";
import NavbarDropdown from "./NavbarDropdown";

function NavbarMenu({ user, toons, fights, isOpen, onToggle }) {
  return (
    <div className={`navbar-menu ${isOpen ? "is-active" : ""}`} id="navbarMenu">
      <div className="navbar-start">
        <Link className="navbar-item" to="/all-toons" onClick={onToggle}>
          All The Toons
        </Link>
        {user && (
          <NavbarDropdown
            user={user}
            label="Toons"
            link="/my-toon"
            list={toons}
            onClick={onToggle}
          />
        )}
        <NavbarDropdown
          user={user}
          label="Fights"
          link="/fight"
          list={fights}
          onClick={onToggle}
        />
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            {!user && (
              <Link className="button is-light" to="/login" onClick={onToggle}>
                Login
              </Link>
            )}
            {!user && (
              <Link
                className="button is-primary"
                to="/register"
                onClick={onToggle}
              >
                Register
              </Link>
            )}
            {user && (
              <Link
                className="button is-primary"
                to="/logout"
                onClick={onToggle}
              >
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
