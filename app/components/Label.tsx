import React from "react";
type Labelprops = React.LabelHTMLAttributes<HTMLLabelElement>;
export default function Label(props: Labelprops) {
  return (
    <label
      {...props}
      className={`text-gray-700  block dark:text-gray-300 mb-1 ${props.className}`}
    >
      {props.children}
    </label>
  );
}
