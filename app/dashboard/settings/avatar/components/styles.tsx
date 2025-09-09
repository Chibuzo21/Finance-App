import { Ban, Check } from "lucide-react";
import { JSX } from "react";
export type title = {
  style: string;
  text: string;
  icon: JSX.Element;
};
export const SuccessAlert: title = {
  text: "Success",
  style: "text-green-700 dark:text-green-300",
  icon: <Check />,
};
export const ErrorAlert: title = {
  text: "Error",
  style: "text-red-700 dark:text-red-300",
  icon: <Ban />,
};
