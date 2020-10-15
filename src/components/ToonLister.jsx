import React, { Component } from "react";
import httpService from "../services/httpService";
import Toon from "./Toon";

class ToonLister extends Component {
  state = {
    toons: [],
  };

  async componentDidMount() {
    const { data: toons } = await httpService.get("api/toons");
    this.setState({ toons });
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
