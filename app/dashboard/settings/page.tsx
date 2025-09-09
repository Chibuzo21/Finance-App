import React from "react";
import SettingsForm from "./components/settings-form";
import { createClient } from "@/lib/supabase/server";

import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const defaults = user.user_metadata;
  console.log(defaults);
  return (
    <>
      <div>Settings</div>
      <SettingsForm defaults={defaults} />
    </>
  );
}
