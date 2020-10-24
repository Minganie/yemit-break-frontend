import React, { Component } from "react";
import SupportToon from "./SupportToon";
import config from "../../config";
import http from "../../services/httpService";

class Support extends Component {
  state = {
    quickAction: "Pass",
    done: true,
    target: "",
    modifier: "",
  };
  toons = this.props.toons || [];

  handleSubmit = async (data) => {
    let url = config.api + "fights/" + this.props.fight._id + "/support/";
    switch (data.name) {
      case "Cover":
        url += "cover";
        break;
      case "Inspire Action":
        url += "inspire";
        break;
      case "Inspire Guard":
        url += "guard";
        break;
      case "Harry":
        url += "harry";
        break;
      case "Pass":
        url += "pass";
        break;
      case "Parry":
      default:
        url += "parry";
        break;
    }
    try {
      await http.post(url, data);
    } catch (e) {
      console.error("Unexpected error while posting toon action:", e);
    }
  };

  render() {
    return (
      <React.Fragment>
        {this.props.myToons.map((toon) => {
          return (
            <SupportToon
              toons={this.toons}
              myToon={toon}
              onSubmit={this.handleSubmit}
            />
          );
        })}
      </React.Fragment>
    );
  }
}

export default Support;
