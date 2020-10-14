import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

function Navbar({ user }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/all-toons">
        Yemit Break
      </Link>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/my-toon">
              Your toons
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/all-toons">
              Our toons
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/fight">
              Fights
            </Link>
          </li>
        </ul>
      </div>
      <div>
        {!user && (
          <Link className="btn btn-secondary mx-1" to="/login">
            Login
          </Link>
        )}
        {user && (
          <Link className="btn btn-secondary mx-1" to="/logout">
            Logout
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
