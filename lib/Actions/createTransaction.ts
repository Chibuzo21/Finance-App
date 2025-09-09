"use server";
import { revalidatePath } from "next/cache";
import { TransactionSchema } from "@/app/dashboard/components/validation";
import { createClient } from "../supabase/server";
import { FormData as FormInfo } from "@/app/dashboard/components/Transaction-form";

export async function createTransaction(formData: FormInfo) {
  const supabase = await createClient();
  const validated = TransactionSchema.safeParse(formData);
  if (!validated.success) {
    throw new Error("Invalid data");
  }
  // safeparse is being used to validate, it returns an error (if its exists) and a value for the data requested if there was no error

  const { error } = await supabase.from("transactions").insert(validated.data);
  if (error) {
    throw new Error("Failed to create the transaction");
  }
  revalidatePath("/dashboard");
}
// it is also important to validate the server as you could be working with other developers and you want to make sure that the data they've sent is valid
