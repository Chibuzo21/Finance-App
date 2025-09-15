"use server";
import { settingsSchema } from "@/app/dashboard/components/validation";
import { createClient } from "../supabase/server";
import { SettingsFormState } from "@/app/dashboard/settings/components/settings-form";

export async function updateSettings(
  prevState: SettingsFormState,
  formData: FormData
) {
  const validated = settingsSchema.safeParse({
    fullName: formData.get("fullName"),
    defaultView: formData.get("defaultView"),
  });
  // safeparse is being used to validate, it returns an error (if its exists) and a value for the data requested if there was no error
  if (!validated.success)
    return {
      errors: validated.error.flatten().fieldErrors,
      message: "Invalid data",
    };
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    data: {
      fullName: validated.data.fullName,
      defaultView: validated.data.defaultView,
    },
  });
  if (error)
    return {
      error: true,
      message: "Failed updating settings",
      errors: {},
    };
  return {
    message: "Updated user settings",
    errors: {},
  };
}
