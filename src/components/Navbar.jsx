import React from "react";
import "bootstrap/dist/css/bootstrap.css";

function Navbar(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">
        Yemit Break
      </a>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="#">
              Your toons
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Our toons
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Fights
            </a>
          </li>
        </ul>
      </div>
      <div>
        <button className="btn btn-secondary mx-1">Login</button>
        <button className="btn btn-secondary mx-1">Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
