import React from "react";
import "./Cell.css";

export const Cell = ({ value, className, isSet, ...props }) => {
  return (
    <div className={`cell ${className} ${isSet ? "set" : null}`} {...props}>
      {value}
    </div>
  );
};
