"use client";
import SubmitButton from "@/app/components/submit-button";
import Link from "next/link";
import { FieldError, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormSchema } from "./validation";
import React, { useState } from "react";
import Field from "./Field";
import { Loader } from "lucide-react";
import { SignUpNewUser } from "@/lib/Actions/signup";

export type FormData = z.infer<typeof FormSchema>;
export default function SignUpForm() {
  const [message, setmessage] = useState({
    Error: false,
    success: false,
  });
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const result = await SignUpNewUser(data);
      if (result.success) {
        setmessage({ ...message, success: true });
      }
    } catch (error) {
      console.error(error);
      setmessage({ ...message, Error: true });
    }
    console.log(data);
  };
  const [visible, setVisible] = useState({
    password: false,
    confirmPassword: false,
  });

  const handlePassword = (field: "password" | "confirmPassword") => {
    setVisible((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Field
        type='text'
        label='Username'
        pholder='Enter your username'
        Name='username'
        register={register}
        error={errors.username as FieldError}
      />
      <Field
        type='email'
        label='Email'
        pholder='Enter your email address'
        Name='email'
        register={register}
        error={errors.email as FieldError}
      />
      <Field
        type={visible.password ? "text" : "password"}
        label='Password'
        pholder='Enter your  password'
        Name='password'
        register={register}
        visible={visible.password}
        error={errors.password as FieldError}
        handlePassword={() => handlePassword("password")}
      />
      <Field
        type={visible.confirmPassword ? "text" : "password"}
        label='Confirm Password'
        pholder='Confirm your password'
        Name='confirmPassword'
        register={register}
        visible={visible.confirmPassword}
        error={errors.confirmPassword as FieldError}
        handlePassword={() => handlePassword("confirmPassword")}
      />
      <p>
        Have an account ?
        <span className='ml-1'>
          <Link href='/login' className=' dark:text-[#32c2a5] font-medium'>
            Login
          </Link>
        </span>
      </p>
      <SubmitButton
        type='submit'
        className='w-full mt-5 dark:bg-white dark:text-[#17332d] bg-[#17332d] flex justify-center text-white rounded-md font-medium py-2 space-x-3 items-center cursor-pointer  mb-3'
        disabled={isSubmitting}>
        {isSubmitting && <Loader className='animate-spin mr-2 h-4 w-4' />}
        Create an account
      </SubmitButton>
      {message.Error ? (
        <p className='errors'>An unknown error occured</p>
      ) : message.success ? (
        <p className='text-green-500 text-center'>
          Signup successful! Please check your email to confirm your account
          before logging in.
        </p>
      ) : (
        ""
      )}
    </form>
  );
}
