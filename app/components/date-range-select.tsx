import React from "react";

import Select from "./Select";
import { selectProps } from "./Select";
export default function DateRangeSelect(props: selectProps) {
  return (
    <Select {...props}>
      {calendar.map((day) => (
        <option key={day.value} value={day.value}>
          {day.text}
        </option>
      ))}
    </Select>
  );
}
const calendar = [
  {
    value: "last24hrs",
    text: "Last 24 hours",
  },

  {
    value: "last7days",
    text: "Last 7 days",
  },
  {
    value: "last30days",
    text: "Last 30 days",
  },
  {
    value: "last12months",
    text: "Last 12 months",
  },
];
