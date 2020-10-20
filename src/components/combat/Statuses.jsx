import React from "react";

function Statuses({ toons, statuses }) {
  const renders = [];
  if (statuses && statuses.is_covering) {
    const target = toons.find((t) => t._id === statuses.covering);
    renders.push(<p key={renders.length + 1}>{`Covering ${target.name}`}</p>);
  }
  if (statuses && statuses.is_covered) {
    const target = toons.find((t) => t._id === statuses.covered_by);
    renders.push(<p key={renders.length + 1}>{`Covered by ${target.name}`}</p>);
  }
  if (statuses && statuses.is_harrying) {
    renders.push(
      <p
        key={renders.length + 1}
      >{`Harrying with ${statuses.harrying_with}`}</p>
    );
  }
  if (statuses && statuses.is_inspiring) {
    const target = toons.find((t) => t._id === statuses.inspiring);
    renders.push(
      <p
        key={renders.length + 1}
      >{`Inspiring ${target.name} to ${statuses.inspiring_to}`}</p>
    );
  }
  if (statuses && statuses.is_inspired) {
    for (const insp of statuses.inspired) {
      const target = toons.find((t) => t._id === insp.by);
      renders.push(
        <p
          key={renders.length + 1}
        >{`Inspired by ${target.name} to ${insp.to}`}</p>
      );
    }
  }
  if (statuses && statuses.is_guarding) {
    const target = toons.find((t) => t._id === statuses.guarding);
    renders.push(<p key={renders.length + 1}>{`Guarding ${target.name}`}</p>);
  }
  if (statuses && statuses.is_guarded) {
    for (const guard of statuses.guarded_by) {
      const target = toons.find((t) => t._id === guard);
      renders.push(
        <p key={renders.length + 1}>{`Guarded by ${target.name}`}</p>
      );
    }
  }
  if (statuses && statuses.is_parrying) {
    renders.push(<p key={renders.length + 1}>Parrying</p>);
  }
  return (
    <div className="has-text-info">
      {renders.map((r) => {
        return r;
      })}
    </div>
  );
}

export default Statuses;
