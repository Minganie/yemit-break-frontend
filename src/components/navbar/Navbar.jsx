import React, { Component } from "react";
import { toast } from "react-toastify";
import NavbarBrand from "./NavbarBrand";
import NavbarMenu from "./NavbarMenu";

class Navbar extends Component {
  state = {
    burgerIsOpen: false,
    listening: false,
  };

  componentDidMount() {
    if (this.props.stream && !this.state.listening) {
      this.setState({ listening: true });
      this.props.stream.addEventListener("fight-created", (event) => {
        try {
          toast.info("A DM just added a fight");
        } catch (e) {
          console.error("Error trying to decode fight-created data", e);
        }
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.stream && !this.state.listening) {
      this.setState({ listening: true });
      this.props.stream.addEventListener("fight-created", (event) => {
        try {
          toast.info("A DM just added a fight");
        } catch (e) {
          console.error("Error trying to decode fight-created data", e);
        }
      });
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
          user={this.props.user}
          toons={this.props.toons}
          fights={this.props.fights}
          isOpen={this.state.burgerIsOpen}
        />
      </nav>
    );
  }
}

export default Navbar;
