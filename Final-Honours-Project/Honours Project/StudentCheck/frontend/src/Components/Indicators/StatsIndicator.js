/**
 * Used for custom cell in class/department/advisor tables
 */

import React from "react";

export default function StatsIndicator(props) {
  const stat = props.stat;
  return (
    <div>
      {stat >= 80 ? (
        <div className="grade excellent">{Math.round(stat)}%</div>
      ) : stat > 60 ? (
        <div className="grade good">{Math.round(stat)}%</div>
      ) : stat > 40 ? (
        <div className="grade warning">{Math.round(stat)}%</div>
      ) : (
        <div className="grade danger">{Math.round(stat)}%</div>
      )}
    </div>
  );
}
