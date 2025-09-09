"use client";
import Input from "@/app/components/Input";
import SubmitButton from "@/app/components/submit-button";
import { login } from "@/lib/Actions/login";
import React from "react";
import { useActionState } from "react";
const initialState = {
  message: "",
  error: true,
};
export default function Loginform() {
  const [state, formAction] = useActionState(login, initialState);
  // the login represents the action that will take place when the form is submitted

  return (
    <form action={formAction} className='space-y-2'>
      <Input
        type='email'
        placeholder='name@example.com'
        name='email'
        required></Input>
      <SubmitButton
        type='submit'
        className='w-full dark:bg-white dark:text-[#17332d] bg-[#17332d] flex justify-center text-white rounded-sm font-medium py-2'>
        Sign in with email
      </SubmitButton>
      <p
        className={`${
          state?.error ? "text-red-500" : "text-green-500"
        } text-center text-sm`}>
        {state?.message}
      </p>
    </form>
  );
}
