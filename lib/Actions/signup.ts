"use server";
import { FormData } from "@/app/(auth)/signup/components/signupform";
import { createClient } from "../supabase/server";
import { FormSchema } from "@/app/(auth)/signup/components/validation";

export async function SignUpNewUser(formData: FormData) {
  const supabase = await createClient();
  const validated = FormSchema.safeParse(formData);
  if (!validated.success) throw new Error("Invalid data");
  const { error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        username: formData.username, // store username in user metadata
      },
    },
  });
  if (error) {
    return { error: true, message: error.message };
    // bubble up error to client
  }

  // Return success instead of forcing redirect
  return {
    success: true,
    message: "Signup successful. Please check your email to confirm.",
  };
}
