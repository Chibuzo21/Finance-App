import React from "react";
type props = {
  className?: string;
};
export default function Skeleton(props: props) {
  return (
    <div
      className={`animate-pulse h-4 w-full rounded-md bg-gray-300 dark:bg-gray-700 ${props.className}`}
    ></div>
  );
}
