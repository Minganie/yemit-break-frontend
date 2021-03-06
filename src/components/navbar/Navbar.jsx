import React, { Component } from "react";
import NavbarBrand from "./NavbarBrand";
import NavbarMenu from "./NavbarMenu";

class Navbar extends Component {
  state = {
    burgerIsOpen: false,
  };

  handleToggle = (e) => {
    this.setState({ burgerIsOpen: !this.state.burgerIsOpen });
  };

  handleClick = (e) => {
    this.setState({ burgerIsOpen: false });
  };

  render() {
    return (
      <nav
        className="navbar has-background-light"
        role="navigation"
        aria-label="main navigation"
      >
        <NavbarBrand onToggle={this.handleToggle} />
        <NavbarMenu
          user={this.props.user}
          toons={this.props.toons}
          fights={this.props.fights}
          isOpen={this.state.burgerIsOpen}
          onToggle={this.handleClick}
        />
      </nav>
    );
  }
}

export default Navbar;
