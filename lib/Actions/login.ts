"use server";
import { createClient } from "../supabase/server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
export async function login(prevState: any, formData: FormData) {
  // console.log(formData);
  // this runs in nodejs and not on the browser because of the use server indicated
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();
  //   const { error } = await supabase.auth.signInWithOtp({
  //     email,
  //     options: {
  //       shouldCreateUser: true,
  //     },
  //   });
  //   // Calls supabase.auth.signInWithOtp() → tells Supabase: “Send a one-time login link (magic link) to this email.”
  //   if (error) {
  //     return {
  //       error: true,
  //       message: "Wrong authenticating",
  //     };
  //   }
  //   return {
  //     message: `Email sent to ${email}`,
  //   };
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.error(error);
    return {
      error: true,
      message: "Wrong authenticating",
    };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
  // return {
  //   message: `Success loggin in`,
  // };
}
