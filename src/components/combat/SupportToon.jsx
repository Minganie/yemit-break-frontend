import React, { Component } from "react";
import { toast } from "react-toastify";
import Select from "../form/Select";

class SupportToon extends Component {
  state = {
    quickAction: "",
    isValid: false,
    target: "",
    modifier: "",
    submitting: false,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.submitting && this.props.myToon.quickAction) {
      this.setState({ submitting: !this.props.myToon.quickAction });
    }
  }

  handleActionChange = (name, value) => {
    const state = {
      quickAction: value,
      target: "",
      modifier: "",
    };
    switch (value) {
      case "Cover":
      case "Inspire":
      case "Guard":
      case "Harry":
        state.isValid = false;
        break;
      case "Pass":
      case "Parry":
      default:
        state.isValid = true;
    }
    this.setState(state);
  };

  handleTargetChange = ({ currentTarget: sel }) => {
    switch (this.state.quickAction) {
      case "Cover":
      case "Guard":
        this.setState({ target: sel.value, isValid: true });
        break;
      case "Inspire":
      default:
        this.setState({ target: sel.value, isValid: this.state.modifier });
    }
  };

  handleModifierChange = (name, value) => {
    switch (this.state.quickAction) {
      case "Inspire":
        this.setState({ modifier: value, isValid: this.state.target });
        break;
      case "Harry":
      default:
        this.setState({ modifier: value, isValid: true });
    }
  };

  renderToonSelect = () => {
    const { toons, myToon } = this.props;
    return (
      <div className="control">
        <div className="select">
          <select
            onChange={this.handleTargetChange}
            value={this.state.target}
            disabled={myToon && myToon.quickAction}
          >
            <option value="" disabled={true}>
              Pick one...
            </option>
            {toons
              .filter((t) => {
                return t._id !== myToon._id;
              })
              .map((toon) => {
                return (
                  <option key={toon._id} value={toon._id}>
                    {toon.name}
                  </option>
                );
              })}
          </select>
        </div>
      </div>
    );
  };

  renderWithToons = (name) => {
    return (
      <div className="field">
        <label className="label">{name + ":"}</label>
        {this.renderToonSelect()}
      </div>
    );
  };

  renderInspire = () => {
    const { myToon } = this.props;
    const list = [
      { _id: "Attack", name: "Attack" },
      { _id: "Heal", name: "Heal" },
    ];
    return (
      <React.Fragment>
        <div className="field">
          <label className="label">Inspire:</label>
          {this.renderToonSelect()}
        </div>

        <Select
          name="to"
          value={this.state.modifier}
          list={list}
          onChange={this.handleModifierChange}
          disabled={myToon && myToon.quickAction}
        />
      </React.Fragment>
    );
  };

  renderHarry = () => {
    const { myToon } = this.props;
    const list = [
      { _id: "Smashing", name: "Smashing" },
      { _id: "Entropy", name: "Entropy" },
    ];
    return (
      <Select
        name="with"
        value={this.state.modifier}
        list={list}
        onChange={this.handleModifierChange}
        disabled={myToon && myToon.quickAction}
      />
    );
  };

  handleSubmit = () => {
    const { myToon } = this.props;
    this.setState({ submitting: true });
    switch (this.state.quickAction) {
      case "Cover":
        return {
          name: "Cover",
          from: myToon._id,
          to: this.state.target,
        };
      case "Inspire":
        return {
          name: "Inspire Offense",
          from: myToon._id,
          to: this.state.target,
          action: this.state.modifier,
        };
      case "Guard":
        return {
          name: "Inspire Guard",
          from: myToon._id,
          to: this.state.target,
        };
      case "Harry":
        return {
          name: "Harry",
          from: myToon._id,
          with: this.state.modifier,
        };
      case "Pass":
        return {
          name: "Pass",
          from: myToon._id,
        };
      case "Parry":
      default:
        return {
          name: "Parry",
          from: myToon._id,
        };
    }
  };

  doSubmit = async () => {
    const { onSubmit } = this.props;
    try {
      await onSubmit(this.handleSubmit());
    } catch (e) {
      const { response } = e;
      const { status, data } = response;
      if (status === 400 && data.message.includes("cover")) {
        toast.error(data.message);
        this.setState({
          quickAction: "",
          isValid: false,
          target: "",
          modifier: "",
          submitting: false,
        });
      } else {
        console.error(
          "Unexpected error while posting toon support",
          e.response
        );
      }
    }
  };

  render() {
    const { myToon } = this.props;
    const done = myToon && myToon.quickAction;
    const quickActions = [
      { _id: "Cover", name: "Cover" },
      { _id: "Inspire", name: "Inspire Action" },
      { _id: "Guard", name: "Inspire Guard" },
      { _id: "Parry", name: "Parry" },
      { _id: "Harry", name: "Harry" },
      { _id: "Pass", name: "Pass" },
    ];
    return (
      <div className="box">
        <h3 className="title is-3">{`${myToon.name}'s quick action`}</h3>
        <Select
          name="action"
          value={this.state.quickAction}
          list={quickActions}
          options={{ label: "Quick Action" }}
          onChange={this.handleActionChange}
          disabled={done || myToon.current_hp < 0}
        />
        {!done &&
          this.state.quickAction === "Cover" &&
          this.renderWithToons("Cover")}
        {!done && this.state.quickAction === "Inspire" && this.renderInspire()}
        {!done &&
          this.state.quickAction === "Guard" &&
          this.renderWithToons("Inspire Guard")}
        {!done && this.state.quickAction === "Harry" && this.renderHarry()}

        <button
          type="button"
          className={`button is-primary ${
            this.state.submitting ? "is-loading" : ""
          }`}
          disabled={!this.state.isValid || done}
          onClick={this.doSubmit}
        >
          Done
        </button>
      </div>
    );
  }
}

export default SupportToon;
