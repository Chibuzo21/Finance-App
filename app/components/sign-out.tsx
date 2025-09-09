"use client";
import { LogOut } from "lucide-react";
import SubmitButton from "./submit-button";
import { signOut } from "@/lib/Actions/signout";
import { variants } from "@/lib/variants";

export default function SignOut() {
  return (
    <form action={signOut}>
      <SubmitButton
        className={`px-4 py-2 rounded-md dark:bg-[#17332d] hover:bg-[#29574d] dark:hover:bg-[#29574d]`}>
        <LogOut className='h-4 w-4' />
      </SubmitButton>
    </form>
  );
}
