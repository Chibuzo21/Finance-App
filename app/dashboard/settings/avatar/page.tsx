"use client";
import Alert from "@/app/components/Alert";
import Input from "@/app/components/Input";
import SubmitButton from "@/app/components/submit-button";
import { uploadAvatar } from "@/lib/Actions/uploadAvatar";
import { SuccessAlert, ErrorAlert } from "./components/styles";
import { useActionState } from "react";

const initialState = {
  message: "",
  error: false,
};
export default function Page() {
  const [state, formAction] = useActionState(uploadAvatar, initialState);
  return (
    <>
      <h1 className='font-semibold mb-8 text-4xl'>Avatar</h1>
      <form className='space-y-4' action={formAction}>
        {state?.error && <Alert title={ErrorAlert}>{state?.message}</Alert>}
        {!state?.error && state?.message && (
          <Alert title={SuccessAlert}>{state?.message}</Alert>
        )}
        <Input
          type='file'
          name='file'
          id='file'
          className='border dark:text-gray-400 px-3 py-4 rounded-md w-[60%] dark:bg-[#29574d] text-gray-500 bg-gray-300 '
        />
        <SubmitButton className='bg-[#0b1916] rounded-md hover:bg-[#29574d] text-white dark:hover:bg-[#29574d] disabled:opacity-50 px-5 py-2'>
          Upload Avatar
        </SubmitButton>
      </form>
    </>
  );
}
