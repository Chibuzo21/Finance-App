"use server";
import { createClient } from "../supabase/server";
export async function login(prevState: any, formData: FormData) {
  // console.log(formData);
  // this runs in nodejs and not on the browser because of the use server indicated
  const email = formData.get("email") as string;
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
    },
  });
  // Calls supabase.auth.signInWithOtp() → tells Supabase: “Send a one-time login link (magic link) to this email.”
  if (error) {
    return {
      error: true,
      message: "Wrong authenticating",
    };
  }
  return {
    message: `Email sent to ${email}`,
  };
}
