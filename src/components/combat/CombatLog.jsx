import React, { Component } from "react";

class CombatLog extends Component {
  state = {
    listening: false,
    log: [],
  };

  updateLog(event) {
    try {
      const action = JSON.parse(event.data);
      const line = {
        ts: new Date(Date.now()),
        msg: action.msg,
      };
      this.setState({ log: [line, ...this.state.log] });
      console.log("Combat log just received an update:", action);
    } catch (e) {
      console.error("Error trying to decode combat log data", e);
    }
  }

  componentDidMount() {
    if (this.props.stream && !this.state.listening) {
      this.setState({ listening: true });
      this.props.stream.addEventListener(
        "action-taken",
        this.updateLog.bind(this)
      );
      this.props.stream.addEventListener(
        "mob-acted",
        this.updateLog.bind(this)
      );
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.stream && !this.state.listening) {
      this.setState({ listening: true });
      this.props.stream.addEventListener(
        "action-taken",
        this.updateLog.bind(this)
      );
      this.props.stream.addEventListener(
        "mob-acted",
        this.updateLog.bind(this)
      );
    }
  }

  formatTime(date) {
    const hh = String(date.getHours()).padStart(2, "0");
    const mm = String(date.getMinutes()).padStart(2, "0");
    const ss = String(date.getSeconds()).padStart(2, "0");
    return `${hh}:${mm}:${ss}`;
  }

  render() {
    return (
      <div className="table-container">
        <table className="table is-striped is-fullwidth">
          <tbody
            style={{
              display: "block",
              height: "200px",
              overflowY: "scroll",
            }}
          >
            {this.state.log.map((line) => {
              return (
                <tr key={line.ts}>
                  <td>{this.formatTime(line.ts)}</td>
                  <td>{line.msg}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default CombatLog;
