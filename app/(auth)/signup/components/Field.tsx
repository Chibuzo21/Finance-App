import Input from "@/app/components/Input";
import Label from "@/app/components/Label";
import { Eye, EyeOff } from "lucide-react";
import { UseFormRegister, FieldError } from "react-hook-form";
import { FormSchema } from "./validation";
import { z } from "zod";
type FormData = z.infer<typeof FormSchema>;
type signup = {
  label: string;
  type: string;
  pholder: string;
  Name: keyof FormData;
  className?: string;
  register: UseFormRegister<FormData>;
  error: FieldError;
  handlePassword?: () => void;
  visible?: boolean;
};

export default function Field(props: signup) {
  return (
    <div className='my-3'>
      <Label>{props.label}</Label>
      {props.label === "Password" || props.label === "Confirm Password" ? (
        <div className='w-full relative'>
          <Input
            type={props.type}
            placeholder={props.pholder}
            className={`py-4 px-3 pr-10`}
            {...props.register(props.Name)}
          />
          {(props.label === "Confirm Password" ||
            props.label === "Password") && (
            <span
              onClick={props.handlePassword}
              className='text-white  cursor-pointer absolute right-7 -translate-y-1/2 top-1/2'>
              {props.visible ? (
                <EyeOff className='w-5 h-5' />
              ) : (
                <Eye className='w-5 h-5' />
              )}
            </span>
          )}
        </div>
      ) : (
        <Input
          type={props.type}
          placeholder={props.pholder}
          className={`py-4 px-3 ${props.className}`}
          {...props.register(props.Name)}
        />
      )}
      {props.error && <p className='errors'>{props.error.message as string}</p>}
    </div>
  );
}
