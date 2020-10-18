import React, { Component } from "react";
import NavbarBrand from "./NavbarBrand";
import NavbarMenu from "./NavbarMenu";
import auth from "../../services/authService";
import http from "../../services/httpService";
import config from "../../config";

class Navbar extends Component {
  state = {
    user: null,
    toons: [],
    fights: [],
    burgerIsOpen: false,
  };
  async componentDidMount() {
    const user = auth.getCurrentUser();
    const fights = await http.get(config.api + "fights");
    this.setState({ user, fights });
    if (user) {
      const toons = await http.get(config.api + "users/me/toons");
      this.setState({ toons });
    }
  }
  handleToggle = (e) => {
    this.setState({ burgerIsOpen: !this.state.burgerIsOpen });
  };

  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <NavbarBrand onToggle={this.handleToggle} />
        <NavbarMenu
          user={this.state.user}
          toons={this.state.toons}
          fights={this.state.fights}
          isOpen={this.state.burgerIsOpen}
        />
      </nav>
    );
  }
}

export default Navbar;
