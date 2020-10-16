import React, { Component } from "react";
import config from "../config";
import httpService from "../services/httpService";
import Toon from "./Toon";

class ToonLister extends Component {
  state = {
    toons: [],
  };

  async componentDidMount() {
    try {
      const toons = await httpService.get(config.api + "toons");
      this.setState({ toons });
    } catch (e) {
      console.error(
        "Unexpected error occurred while trying to fetch toon list",
        e
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.toons.map((toon) => {
          return <Toon key={toon._id} {...toon} />;
        })}
      </React.Fragment>
    );
  }
}

export default ToonLister;
