"use server";
import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteTransaction(id: number) {
  const supabase = await createClient();
  const { error } = await supabase.from("transactions").delete().eq("id", id);
  // we are indicating that we will be deleting by id, which will be provided when we call this function. so specifying id prevents us from deleting the entire database and just only the id specified.
  // rpc is used to invoke a sqlpostgress function while .from is used to access the table using its name ('transaction')
  if (error) throw new Error(`Could not delete the transaction ${id}`);
  revalidatePath("/dashboard");
  // revalidatePath is used to revalidate a specific path after data mutation, it forces the route to refresh the data and update cache.
}
