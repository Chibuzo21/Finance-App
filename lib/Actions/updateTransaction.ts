"use server";
import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";
import { TransactionSchema } from "@/app/dashboard/components/validation";
import { FormData as FormInfo } from "@/app/dashboard/components/Transaction-form";
export async function updateTransaction(id: string, formData: FormInfo) {
  const validated = TransactionSchema.safeParse(formData);
  if (!validated.success) {
    throw new Error("Invalid data");
  }
  // safeparse is being used to validate, it returns an error (if its exists) and a value for the data requested if there was no error
  const supabase = await createClient();
  const { error } = await supabase
    .from("transactions")
    .update(validated.data)
    .eq("id", id);
  if (error) {
    throw new Error("Failed to update the transaction");
  }
  revalidatePath("/dashboard");
}
