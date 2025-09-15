import React from "react";
import SignUpForm from "./components/signupform";

export default function Signup() {
  return (
    <div className='mx-auto w-full flex flex-col space-y-4 justify-center sm:w-[450px] p-32'>
      <div>
        <h1 className='text-4xl font-medium mb-3'>Create An Account</h1>
        <p>Please enter your details below to continue</p>
      </div>

      <SignUpForm />
    </div>
  );
}
