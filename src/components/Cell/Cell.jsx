import React from "react";
import "./Cell.css";

export const Cell = ({ value, className, ...props }) => {
  return (
    <div className={`cell ${className}`} {...props}>
      {value}
    </div>
  );
};
