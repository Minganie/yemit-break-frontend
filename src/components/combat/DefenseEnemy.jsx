import React, { Component } from "react";
import Select from "../form/Select";
import MultiSelect from "../form/MultiSelect";
import Input from "../form/Input";

class DefenseEnemy extends Component {
  state = {
    action: "",
    target: [],
    roll: 0,
    modifier: 0,
    submitting: false,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.submitting && this.props.enemy.action) {
      this.setState({
        submitting: !this.props.enemy.action,
      });
    }
  }

  handleActionChange = (name, value) => {
    this.setState({ action: value, target: [], roll: 0, modifier: 0 });
  };

  handleSubmit = () => {
    const { enemy } = this.props;
    this.setState({ submitting: true });
    switch (this.state.action) {
      case "Attack":
        return {
          name: "Mob Attack",
          from: enemy._id,
          to: this.state.target,
          roll: this.state.roll,
        };
      default:
        return {
          name: "Tank Buster",
          from: enemy._id,
          to: this.state.target,
          roll: this.state.roll,
          tankBusterBonus: this.state.modifier,
        };
    }
  };

  handleTargetChange = (name, value) => {
    let isValid;
    if (this.state.action === "Attack")
      isValid = value && value.length && Number.isInteger(this.state.roll);
    else
      isValid =
        value &&
        value.length &&
        Number.isInteger(this.state.roll) &&
        this.state.modifier;
    this.setState({
      target: value,
      isValid,
    });
  };

  handleRollChange = (name, value) => {
    value = Math.max(Math.min(value, 1000), 0);
    let isValid;
    if (this.state.action === "Attack")
      isValid =
        Number.isInteger(value) &&
        this.state.target &&
        this.state.target.length;
    else
      isValid =
        Number.isInteger(value) &&
        this.state.target &&
        this.state.target.length &&
        this.state.modifier;
    this.setState({
      roll: value,
      isValid,
    });
  };

  handleBusterChange = (name, value) => {
    const val = Math.max(value, 0);
    this.setState({
      modifier: val,
      isValid:
        val &&
        this.state.target &&
        this.state.target.length &&
        Number.isInteger(this.state.roll),
    });
  };

  renderAttack = () => {
    const { toons } = this.props;
    return (
      <React.Fragment>
        <MultiSelect
          name="targets"
          value={this.state.target}
          list={toons}
          options={{ label: "Attack:" }}
          onChange={this.handleTargetChange}
        />
        <Input
          type="number"
          name="roll"
          value={this.state.roll}
          onChange={this.handleRollChange}
          error={null}
        />
      </React.Fragment>
    );
  };

  renderTankBuster = () => {
    const { toons } = this.props;
    return (
      <React.Fragment>
        <MultiSelect
          name="targets"
          value={this.state.target}
          list={toons}
          options={{ label: "Attack:" }}
          onChange={this.handleTargetChange}
        />
        <Input
          type="number"
          name="roll"
          value={this.state.roll}
          onChange={this.handleRollChange}
          error={null}
        />
        <Input
          type="number"
          name="buster"
          value={this.state.modifier}
          options={{ label: "Buster Bonus:" }}
          onChange={this.handleBusterChange}
          error={null}
        />
      </React.Fragment>
    );
  };

  render() {
    const { enemy, onSubmit } = this.props;
    const done = enemy && enemy.action;
    if (enemy.current_hp < 1) return null;
    else
      return (
        <div className="box">
          <h3 className="title is-3">{`${enemy.name}'s action`}</h3>
          <Select
            name="action"
            value={this.state.action}
            list={[
              { _id: "Attack", name: "Attack" },
              { _id: "Tank Buster", name: "Tank Buster" },
            ]}
            options={{ label: "Action:" }}
            onChange={this.handleActionChange}
            disabled={done}
          />

          {!done && this.state.action === "Attack" && this.renderAttack()}
          {!done &&
            this.state.action === "Tank Buster" &&
            this.renderTankBuster()}

          <button
            type="button"
            className={`button is-primary ${
              this.state.submitting ? "is-loading" : ""
            }`}
            disabled={!this.state.isValid || done}
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

export default DefenseEnemy;
