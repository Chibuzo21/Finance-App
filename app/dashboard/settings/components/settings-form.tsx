"use client";
import Alert from "@/app/components/Alert";
import SubmitButton from "@/app/components/submit-button";
import {
  SuccessAlert,
  ErrorAlert,
} from "@/app/dashboard/settings/avatar/components/styles";
import { useActionState } from "react";
import { updateSettings } from "@/lib/Actions/updateSettings";
import { UserMetadata } from "@supabase/supabase-js";
import Input from "@/app/components/Input";
import Label from "@/app/components/Label";
import DateRangeSelect from "@/app/components/date-range-select";
import FormError from "@/app/components/form-error";

type SettingsFormErrors = {
  fullName?: string[];
  defaultView?: string[];
  // [key: string]: string[] | undefined;
};

type SettingsFormState = {
  error?: boolean;
  message: string;
  errors: SettingsFormErrors;
};

const initialState: SettingsFormState = {
  error: false,
  message: "",
  errors: {},
};
export default function SettingsForm({ defaults }: { defaults: UserMetadata }) {
  const [state, formAction] = useActionState<SettingsFormState, FormData>(
    updateSettings,
    initialState
  );
  console.log(state);

  return (
    <form className='space-y-4' action={formAction}>
      {state?.error && <Alert title={ErrorAlert}>{state?.message}</Alert>}
      {!state?.error && state?.message && (
        <Alert title={SuccessAlert}>{state?.message}</Alert>
      )}
      <Label htmlFor='fullName'>User full name</Label>
      <Input
        type='text'
        placeholder='user full name'
        id='fullName'
        name='fullName'
        defaultValue={defaults?.fullName}
      />
      {state?.errors["fullName"]?.map((error) => (
        <p key={`fullName-${error}`} className='errors'>
          {error}
        </p>
      ))}
      <Label htmlFor='defaultView'>Default transactions view</Label>
      <DateRangeSelect
        id='defaultView'
        defaultValue={defaults?.defaultView}
        name='defaultView'
      />
      {state?.errors["defaultView"]?.map((error) => (
        <p key={`defaultView-${error}`} className='errors'>
          {error}
        </p>
      ))}
      <SubmitButton>Update settings</SubmitButton>
    </form>
  );
}
