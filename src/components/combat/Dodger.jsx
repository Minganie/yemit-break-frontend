import React, { Component } from "react";
import Input from "../form/Input";

class Dodger extends Component {
  state = {
    roll: 0,
    submitting: false,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.submitting) {
      this.setState({ submitting: !this.props.attack });
    }
  }

  handleSubmit = () => {
    const { attack } = this.props;
    this.setState({ submitting: true });
    return {
      name: "Resolve",
      from: attack.to,
      to: attack._id,
      roll: this.state.roll,
    };
  };

  handleRollChange = (name, value) => {
    const val = Math.max(Math.min(value, 1000), 0);
    this.setState({
      roll: val,
    });
  };

  render() {
    const { attack, onSubmit } = this.props;
    return (
      <div className="box">
        <h3 className="title is-3">{`${attack.toon.name}: defend against ${attack.enemy.name}!`}</h3>
        <Input
          type="number"
          name="roll"
          value={this.state.roll}
          onChange={this.handleRollChange}
          error={null}
        />
        <button
          type="button"
          className={`button is-primary ${
            this.state.submitting ? "is-loading" : ""
          }`}
          disabled={!this.state.roll}
          onClick={() => {
            onSubmit(this.handleSubmit());
          }}
        >
          Done
        </button>
      </div>
    );
  }
}

export default Dodger;
