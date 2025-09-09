"use server";
import { TrendsType } from "@/app/dashboard/components/Trends";
import { createClient } from "../supabase/server";
export async function fetchTransaction(
  range: TrendsType["range"],
  offset = 0,
  limit = 10
) {
  const supabase = await createClient();

  // always add await to this function
  let { data, error } = await supabase.rpc("fetch_transactions", {
    limit_arg: limit,
    offset_arg: offset,
    range_arg: range,
  });
  if (error) throw new Error("We can't fetch transaction");
  return data;
}
