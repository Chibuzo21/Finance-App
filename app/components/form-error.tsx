import React from "react";
import { FieldErrors } from "react-hook-form";
import { FormData } from "../dashboard/components/Transaction-form";
type errorType = {
  errors: FieldErrors<FormData>;
  fieldName: keyof FormData;
};
export default function FormError({ errors, fieldName }: errorType) {
  const error = errors[fieldName];
  return error && <p className='errors'>{error.message}</p>;
}
