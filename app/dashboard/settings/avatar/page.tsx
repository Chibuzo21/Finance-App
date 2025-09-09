"use client";
import Alert from "@/app/components/Alert";
import Input from "@/app/components/Input";
import SubmitButton from "@/app/components/submit-button";
import { uploadAvatar } from "@/lib/Actions/uploadAvatar";
import { SuccessAlert, ErrorAlert } from "./components/styles";
import { useActionState } from "react";

const initialState = {
  error: false,
  message: "",
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
        <Input type='file' name='file' id='file' />
        <SubmitButton>Upload Avatar</SubmitButton>
      </form>
    </>
  );
}
