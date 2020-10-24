import React from "react";

function TitleBlock(props) {
  return (
    <div className="columns mt-1">
      <div className="column is-three-quarters">
        <h1 className="title is-1">{props.name}</h1>
        <h2 className="title">{`Round ${props.round} - ${props.phase}`}</h2>
      </div>
      <div className="column">
        {props.user &&
          props.user.permissions &&
          props.user.permissions.includes("DM") && (
            <button
              type="button"
              onClick={props.onClick}
              className={`button is-danger ${
                props.advancing ? "is-loading" : ""
              }`}
              disabled={props.advancing}
            >
              Next phase
            </button>
          )}
      </div>
    </div>
  );
}

export default TitleBlock;
