import React from "react";
import { TransactionProps } from "@/app/components/transaction-item";
import BaseTrend from "@/app/components/Trend";
import { trendProps } from "@/app/components/Trend";
import { createClient } from "@/lib/supabase/server";

export type TrendsType = {
  type: TransactionProps["type"];
  range: "last7days" | "last24hrs" | "last12months" | "last30days";
};
export default async function Trends({ type, range }: TrendsType) {
  const supabase = await createClient();
  let { data, error } = await supabase.rpc("calculate_total", {
    type_arg: type,
    range_arg: range,
    // This more like fetching from an api and not a direction to the database
    // rpc is used to call a postgreSQL function to the client using supabase so we indicate the  name of the function (calculate_total), and also the argument type_arg (with its value which is type)
  });
  // rpc means remote procedure calls
  if (error) throw new Error("Could not fetch the trend data ");
  // use new error to customize your error message
  // because we changed the format of our data from just returning amount to returning an array of current_amount and previous_amount. our data willchange
  const amount = data[0].current_amount;
  const prevAmount = data[0].previous_amount;
  const trends = { amount, prevAmount, type };
  console.log(data);
  return (
    <div>
      <BaseTrend {...trends} />
    </div>
  );
}
