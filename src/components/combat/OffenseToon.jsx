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
    if (prevState.submitting) {
      this.setState({ submitting: !this.props.myToon.action });
    }
  }

  handleActionChange = ({ currentTarget: sel }) => {
    const state = {
      action: sel.value,
      target: [],
      roll: 0,
      modifier: "",
    };
    switch (sel.value) {
      case "Attack":
      case "Heal":
        state.isValid = false;
        break;
      case "Precise Attack":
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
    this.setState({
      modifier: value,
      isValid: this.state.roll && this.state.target && this.state.target.length,
    });
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

  renderAttack = () => {
    const { enemies } = this.props;
    return (
      <React.Fragment>
        <MultiSelect
          name="targets"
          value={this.state.target}
          list={enemies}
          options={{ label: "Attack:" }}
          onChange={this.handleTargetChange}
        />
        <Select
          name="modifier"
          value={this.state.modifier}
          list={[
            { id: "Smashing", name: "Smashing" },
            { id: "Entropy", name: "Entropy" },
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
    return (
      <div className="box">
        <h3 className="title is-3">{`${myToon.name}'s action`}</h3>
        <div className="field">
          <label className="label">Action</label>
          <div className="control">
            <div className="select">
              <select
                onChange={this.handleActionChange}
                value={this.state.action}
                disabled={myToon && myToon.action}
              >
                <option value="" disabled={true}>
                  Pick one...
                </option>
                <option value="Attack">Attack</option>
                <option value="Precise Attack">Precise Attack</option>
                <option value="Heal">Healing</option>
                <option value="Pass">Pass</option>
              </select>
            </div>
          </div>
        </div>
        {this.state.action === "Attack" && this.renderAttack()}
        {this.state.action === "Heal" && this.renderHeal()}

        <button
          type="button"
          className={`button is-primary ${
            this.state.submitting ? "is-loading" : ""
          }`}
          disabled={!this.state.isValid || myToon.action}
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
