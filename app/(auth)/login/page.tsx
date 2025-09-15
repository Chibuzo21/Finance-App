import React from "react";
import Loginform from "./components/login-form";
import Link from "next/link";

export default function Loginpage() {
  return (
    <div className='mx-auto w-full flex flex-col space-y-6 justify-center sm:w-[350px] p-40'>
      <div className='flex flex-col space-y-3 text-center'>
        <h1 className='text-2xl font-semibold'>Welcome back</h1>
        <p className=' dark:text-[#74e2c8]'>Enter your details to sign in</p>
      </div>
      <Loginform />
      <p className='text-center'>
        No account ?
        <span>
          <Link href='/signup' className='dark:text-[#021712] font-semibold '>
            {" "}
            Sign up
          </Link>
        </span>
      </p>
    </div>
  );
}
