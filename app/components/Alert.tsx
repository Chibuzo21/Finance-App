import React from "react";
import { title } from "../dashboard/settings/avatar/components/styles";

type AlertProps = {
  title: title;
  children: React.ReactNode;
};
export default function Alert({ title, children }: AlertProps) {
  return (
    <div className='p-2 rounded-md border border-gray-200 dark:border-gray-800 flex space-x-2 '>
      <div className='flex-shrink-0'>
        <span className={`h-6 w-6 ${title.style}`}>{title.icon}</span>
      </div>
      <div className='space-y-1'>
        <h5 className={`${title.style}`}>{title.text}</h5>
        <div className={`text-sm ${title.style}`}>{children}</div>
      </div>
    </div>
  );
}
