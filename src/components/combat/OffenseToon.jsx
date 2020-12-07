import React, { Component } from "react";
import MultiSelect from "../form/MultiSelect";
import Input from "../form/Input";
import Select from "../form/Select";

class OffenseToon extends Component {
  state = {
    action: "",
    isValid: false,
    target: [],
    modifier: "",
    roll: 0,
    submitting: false,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.submitting && this.props.myToon.action) {
      this.setState({
        submitting: !this.props.myToon.action,
      });
    }
  }

  handleActionChange = (name, value) => {
    const state = {
      action: value,
      target: [],
      roll: 0,
      modifier: "",
    };
    switch (value) {
      case "Attack":
      case "Heal":
      case "Precise Attack":
        state.isValid = false;
        break;
      case "Pass":
      default:
        state.isValid = true;
    }
    this.setState(state);
  };

  handleTargetChange = (name, value) => {
    switch (this.state.action) {
      case "Heal":
        this.setState({
          target: value,
          isValid: value && value.length && this.state.roll,
        });
        break;
      case "Attack":
        this.setState({
          target: value,
          isValid:
            value && value.length && this.state.roll && this.state.modifier,
        });
        break;
      case "Precise Attack":
        this.setState({
          target: value,
          isValid: value && value.length && this.state.modifier,
        });
        break;
      case "Pass":
      default:
        this.setState({ target: value, isValid: true });
    }
  };

  handleRollChange = (name, value) => {
    const val = Math.max(Math.min(value, 1000), 0);
    switch (this.state.action) {
      case "Heal":
        this.setState({
          roll: val,
          isValid: val && this.state.target && this.state.target.length,
        });
        break;
      case "Attack":
        this.setState({
          roll: val,
          isValid:
            val &&
            this.state.target &&
            this.state.target.length &&
            this.state.modifier,
        });
        break;
      default:
        this.setState({ roll: val, isValid: true });
    }
  };

  handleModifierChange = (name, value) => {
    switch (this.state.action) {
      case "Attack":
      case "Heal":
        this.setState({
          modifier: value,
          isValid:
            this.state.roll && this.state.target && this.state.target.length,
        });
        break;
      case "Precise Attack":
      default:
        this.setState({
          modifier: value,
          isValid: this.state.target && this.state.target.length,
        });
    }
  };

  renderHeal = () => {
    const { toons } = this.props;
    return (
      <React.Fragment>
        <MultiSelect
          name="targets"
          value={this.state.target}
          list={toons}
          options={{ label: "Healing:" }}
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

  renderEnemyTargetSelect = (enemies) => {
    return (
      <MultiSelect
        name="targets"
        value={this.state.target}
        list={enemies}
        options={{ label: this.state.action }}
        onChange={this.handleTargetChange}
        constraint={(enemy) => {
          return enemy.current_hp > 0;
        }}
        constraintMessage={(enemy) => {
          return enemy.current_hp > 0 ? null : enemy.name + "'s dead!";
        }}
      />
    );
  };

  renderAttack = () => {
    const { enemies } = this.props;
    return (
      <React.Fragment>
        {this.renderEnemyTargetSelect(enemies)}
        <Select
          name="modifier"
          value={this.state.modifier}
          list={[
            { _id: "Smashing", name: "Smashing" },
            { _id: "Entropy", name: "Entropy" },
          ]}
          options={{ label: "With:" }}
          onChange={this.handleModifierChange}
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

  renderPreciseAttack = () => {
    const { enemies } = this.props;
    return (
      <React.Fragment>
        {this.renderEnemyTargetSelect(enemies)}
        <Select
          name="modifier"
          value={this.state.modifier}
          list={[
            { _id: "Smashing", name: "Smashing" },
            { _id: "Entropy", name: "Entropy" },
          ]}
          options={{ label: "With:" }}
          onChange={this.handleModifierChange}
        />
      </React.Fragment>
    );
  };

  handleSubmit = () => {
    const { myToon } = this.props;
    this.setState({ submitting: true });
    switch (this.state.action) {
      case "Attack":
        return {
          name: "Attack",
          from: myToon._id,
          to: this.state.target,
          roll: this.state.roll,
          with: this.state.modifier,
        };
      case "Precise Attack":
        return {
          name: "Precise Attack",
          from: myToon._id,
          to: this.state.target,
        };
      case "Heal":
        return {
          name: "Heal",
          from: myToon._id,
          to: this.state.target,
          roll: this.state.roll,
        };
      default:
        return {
          name: "Pass",
          from: myToon._id,
        };
    }
  };

  render() {
    const { myToon, onSubmit } = this.props;
    const done = myToon && myToon.action;
    return (
      <div className="box">
        <h3 className="title is-3">{`${myToon.name}'s action`}</h3>
        <Select
          name="action"
          value={this.state.action}
          list={[
            { _id: "Attack", name: "Attack" },
            { _id: "Precise Attack", name: "Precise Attack" },
            { _id: "Heal", name: "Heal" },
            { _id: "Pass", name: "Pass" },
          ]}
          onChange={this.handleActionChange}
          disabled={done}
          constraint={(o) => {
            if (myToon.quickAction === "Harry")
              return o.name === "Precise Attack";
            else return true;
          }}
          constraintMessage={(o) => {
            return "Only wit-based attacks allowed when harrying";
          }}
        />
        {!done && this.state.action === "Attack" && this.renderAttack()}
        {!done &&
          this.state.action === "Precise Attack" &&
          this.renderPreciseAttack()}
        {!done && this.state.action === "Heal" && this.renderHeal()}

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

export default OffenseToon;
