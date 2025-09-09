import React, { forwardRef } from "react";

type Inputprops = {
  type: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
export default forwardRef(function Input(
  props: Inputprops,
  ref: React.Ref<HTMLInputElement>
) {
  // ref is a prop which comes from the register property being used on inputs and select in react-hook-form at the transactionForm component. Now refs are not to be used on functional components like this one. To solve this problem, we introduce the forwardrefs. forwardref allows you to pass a ref through a component to one of its child DOM elements(eg input, select elements)
  type styles = {
    [key: string]: string;
  };
  const styles: styles = {
    checkbox:
      "rounded text-gray-700 border-gray-300 bg-white dark:text-gray-500 dark:bg-gray-950  shadow-sm disabled:opacity-75",
    file: "file:bg-transparent file:border-0 file:text-sm file:font-medium file:disabled:opacity-50 file:dark:text-gray=400 ",
    default:
      "w-full rounded-md bg-white dark:border-gray-300  shadow-sm border-gray-300 dark:bg-[#0b1916] disabled:opacity-75",
  };
  return (
    <input
      {...props}
      ref={ref}
      className={styles[props.type] ?? styles["default"]}
    />
  );
});
