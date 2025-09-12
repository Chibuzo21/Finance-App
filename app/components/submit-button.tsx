import React from "react";
import { useFormStatus } from "react-dom";
import { Loader } from "lucide-react";
import { ButtonProps } from "./button";
import Button from "./button";
export default function SubmitButton(props: ButtonProps) {
  const { pending } = useFormStatus();
  // useFormStatus returns the status of the form element and must be defined as a child of the <form> element
  return (
    <button
      {...props}
      className={`${props.className} flex space-x-3 items-center`}
      disabled={pending}
      type='submit'>
      {pending && <Loader className='animate-spin mr-2 h-4 w-4' />}
      {props.children}
    </button>
  );
}
