import React from "react";
import { Link } from "react-router-dom";

function NavbarDropdown({ user, label, link, list, onClick }) {
  let requiredPermissions;
  switch (label) {
    case "Toons":
      requiredPermissions = "Player";
      break;
    case "Fights":
    default:
      requiredPermissions = "DM";
  }
  const allowCreate =
    user && user.permissions && user.permissions.includes(requiredPermissions);
  return (
    <div className={"navbar-item has-dropdown is-hoverable"}>
      <div className="navbar-link is-arrowless">{label}</div>
      <div className="navbar-dropdown">
        {allowCreate && (
          <React.Fragment>
            <Link className="navbar-item" to={link} onClick={onClick}>
              Create a new {label.capitalize().slice(0, -1)}
            </Link>
            <hr className="navbar-divider" />
          </React.Fragment>
        )}
        {list.map((item) => {
          return (
            <Link
              key={item._id}
              className="navbar-item"
              to={`${link}/${item._id}`}
              onClick={onClick}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default NavbarDropdown;
