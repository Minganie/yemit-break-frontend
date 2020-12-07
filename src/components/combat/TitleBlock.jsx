import React from "react";

function TitleBlock({
  name,
  round,
  phase,
  user,
  onAdvance,
  advancing,
  onDelete,
  deleting,
}) {
  return (
    <div className="columns mt-1">
      <div className="column is-three-quarters">
        <h1 className="title is-1">{name}</h1>
        <h2 className="title">{`Round ${round} - ${phase}`}</h2>
      </div>
      <div className="column">
        {user && user.permissions && user.permissions.includes("DM") && (
          <button
            type="button"
            onClick={onAdvance}
            className={`button is-warning ${advancing ? "is-loading" : ""}`}
            disabled={advancing}
          >
            Next phase
          </button>
        )}
      </div>
      <div className="column">
        {user && user.permissions && user.permissions.includes("DM") && (
          <button
            type="button"
            onClick={onDelete}
            className={`button is-danger ${deleting ? "is-loading" : ""}`}
            disabled={deleting}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default TitleBlock;
