import React from "react";
import { variants, sizes } from "@/lib/variants";
export type ButtonProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>; //typeof gets the type of a value eg type of variants below returns default:string,outline:string,ghost:string.
//  keyof returns a union of keys, so the keyof typeof returns "outline"|"default"|"ghost"

export default function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      className={`${
        props.variant ? variants[props.variant] : variants["default"]
      }${props.size ? sizes[props.size] : sizes["base"]} ${props.className}`}>
      {props.children}
    </button>
  );
}
