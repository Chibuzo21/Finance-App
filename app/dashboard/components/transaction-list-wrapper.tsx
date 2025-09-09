import React from "react";
import TransactionList from "./transaction-list";
import { fetchTransaction } from "@/lib/Actions/fetchTransaction";
import { TrendsType } from "./Trends";

export default async function TransactionListWrapper({
  range,
}: {
  range: TrendsType["range"];
}) {
  const transaction = await fetchTransaction(range);
  return (
    <TransactionList
      initialtransactions={transaction}
      key={range}
      range={range}
    />
  );
}
// when the key prop changes, the transactionlist will re render, using this method is more reliable than useEffect
