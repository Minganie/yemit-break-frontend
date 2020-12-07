import React, { Component } from "react";

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

  handleActionChange = ({ currentTarget: sel }) => {
    const state = {
      quickAction: sel.value,
      target: "",
      modifier: "",
    };
    switch (sel.value) {
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

  handleModifierChange = ({ currentTarget: sel }) => {
    switch (this.state.quickAction) {
      case "Inspire":
        this.setState({ modifier: sel.value, isValid: this.state.target });
        break;
      case "Harry":
      default:
        this.setState({ modifier: sel.value, isValid: true });
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
    return (
      <React.Fragment>
        <div className="field">
          <label className="label">Inspire:</label>
          {this.renderToonSelect()}
        </div>
        <div className="field">
          <label className="label">To:</label>
          <div className="control">
            <div className="select">
              <select
                value={this.state.modifier}
                onChange={this.handleModifierChange}
                disabled={myToon && myToon.quickAction}
              >
                <option value="" disabled={true}>
                  Pick one...
                </option>
                <option>Attack</option>
                <option>Heal</option>
              </select>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  renderHarry = () => {
    const { myToon } = this.props;
    return (
      <div className="field">
        <label className="label">With:</label>
        <div className="control">
          <div className="select">
            <select
              value={this.state.modifier}
              onChange={this.handleModifierChange}
              disabled={myToon && myToon.quickAction}
            >
              <option value="" disabled={true}>
                Pick one...
              </option>
              <option value="Smashing">Smashing</option>
              <option value="Entropy">Entropy</option>
            </select>
          </div>
        </div>
      </div>
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

  render() {
    const { myToon, onSubmit } = this.props;
    const done = myToon && myToon.quickAction;
    return (
      <div className="box">
        <h3 className="title is-3">{`${myToon.name}'s quick action`}</h3>
        <div className="field">
          <label className="label">Quick Action</label>
          <div className="control">
            <div className="select">
              <select
                onChange={this.handleActionChange}
                value={this.state.quickAction}
                disabled={done}
              >
                <option value="" disabled={true}>
                  Pick one...
                </option>
                <option value="Cover">Cover</option>
                <option value="Inspire">Inspire Action</option>
                <option value="Guard">Inspire Guard</option>
                <option value="Parry">Parry</option>
                <option value="Harry">Harry</option>
                <option value="Pass">Pass</option>
              </select>
            </div>
          </div>
        </div>
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

export default SupportToon;
