import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import TransactionForm from "@/app/dashboard/components/Transaction-form";
import React from "react";
import { notFound } from "next/navigation";
export const metadata: Metadata = {
  title: "Edit Metadata",
};
export default async function page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: transaction, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("id", id)
    .single();
  // The above is used to retrieve a single row of data from our table
  // const {data:transaction}, since a data is a known property from the supabase, you assign this data to a constant called transaction
  // .eq is used for filtering, in this case, it returns results where "id" equals id
  // console.log(transaction);
  if (error) notFound();
  return (
    <>
      <h1 className='text-4xl font-semibold mb-8'>Edit Transaction</h1>
      <TransactionForm initialdata={transaction} />
    </>
  );
}
