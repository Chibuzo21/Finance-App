import React, { forwardRef } from "react";
export type selectProps = React.SelectHTMLAttributes<HTMLSelectElement>;
type refprops = React.Ref<HTMLSelectElement>;
export default forwardRef(function Select(props: selectProps, ref: refprops) {
  // ref is a prop which comes from the register property being used on inputs and select in react-hook-form at the transactionForm component. Now refs are not to be used on functional components like this one. To solve this problem, we introduce the forwardrefs. This is basically saying that refs can only be passed directly to elements such as input, select, etc and not to components like this our Select and Input components. Note this ref comes from the register prop in react-hook-form. to solve ths issue, we use forwardrefs to be able to move refs directly into componenets where they will be moved to the elements that need them
  return (
    <select
      ref={ref}
      {...props}
      className='w-full rounded-md bg-white dark:border-[#29574d] shadow-sm border-gray-300 dark:bg-[#0b1916]'>
      {props.children}
    </select>
  );
});
