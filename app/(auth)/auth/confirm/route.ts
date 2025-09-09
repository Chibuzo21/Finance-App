import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  //   new URL is a method that creates a url object in javascript thus the url now has properties like searchparams, pathname,hostname etc
  const token_hash = searchParams.get("token_hash");
  //   This means that the new url has a querykey known as token_hash so i now try to get its value. same for the type and next querykeys
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  if (token_hash && type) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    // verifyOtp helps to authenticate the user, it checks to see if the type and token matches what is stored, if yes then it logs the user. else it returns an error
    if (!error) {
      // redirect user to specified redirect URL or root of app
      redirect(next);
    }
  }

  // redirect the user to an error page with some instructions
  redirect("/error");
}
