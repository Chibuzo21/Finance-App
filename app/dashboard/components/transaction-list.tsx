"use client";
import TransactionItem from "@/app/components/transaction-item";
import React, { useState } from "react";
import { TransactionProps } from "@/app/components/transaction-item";
import TransactionSummaryItem from "@/app/components/transaction-summary-item";
import Seperator from "@/app/components/seperator";
import { groupAndSumTransactionsByDate } from "@/lib/utils";

import { TrendsType } from "./Trends";
import { fetchTransaction } from "@/lib/Actions/fetchTransaction";
import { Loader } from "lucide-react";

export type User = {
  id: number;
  created_at: string;
} & TransactionProps;
export type group = {
  [date: string]: {
    transactions: User[];
    amount: number;
  };
};
type Listprops = {
  initialtransactions: User[];
  range: TrendsType["range"];
};
export default function TransactionList({
  initialtransactions,
  range,
}: Listprops) {
  // const response = await fetch(`${process.env.API_URL}/transactions`, {
  //   next: {
  //     tags: ["transaction-list"],
  //   },
  //   // The above which is a server action is a way of triggering revalidation of cached data so as to enable it have the updated version always. Now this is with a tag (here is 'transaction-list'). so whenever this tag is called revalidation takes place.
  // });
  // const transactions: User[] = await response.json();

  // .from("transactions")
  // // from specifies the particular table we want to fetch from, remember our table is titled transactions
  // .select("*")
  // .order("created_at", { ascending: true });
  // we use select to select everything ie all the columns
  // order helps us to sort, we specify the property we are sorting with (created_at) and the format in ascending order
  const [transaction, setTransaction] = useState(initialtransactions);

  const [buttonHidden, setButtonHidden] = useState(
    initialtransactions.length === 0
  );
  const [loading, setLoading] = useState(false);
  const grouped: group = groupAndSumTransactionsByDate(transaction);
  console.log(Object.entries(grouped));
  const handleClick = async () => {
    setLoading(true);
    try {
      const nextTransaction: null | User[] = await fetchTransaction(
        range,
        transaction.length,
        5
        // we replace the value of offset with transaction because unlike initialtransaction which has a static value and will not change its value when we delete a particular transaction, transaction's value actually change
      );
      if (nextTransaction) {
        setButtonHidden(nextTransaction.length === 0);
        setTransaction((prevTran) => [...prevTran, ...nextTransaction]);
      }
    } finally {
      setLoading(false);
    }
  };
  const handleRemoved = (id: number) => () => {
    // This is a higher function where a function returns another function
    setTransaction((prev) => [...prev].filter((t) => t.id !== id));
  };
  return (
    // <>
    //
    //
    // </>
    <div className='space-y-8'>
      {Object.entries(grouped).map(
        ([date, { transactions, amount }], index) => (
          <div key={index}>
            <TransactionSummaryItem date={date} amount={amount} />
            <Seperator />
            <section className='space-y-4'>
              {transactions.map((transaction) => (
                <div key={transaction.id}>
                  <TransactionItem
                    {...transaction}
                    //    This is same as writing  type={transaction.type} amount={transaction.amount} description={transaction.description} category={transaction.category}
                    onRemoved={handleRemoved(transaction.id)}
                  />
                </div>
              ))}
            </section>
          </div>
        )
      )}
      {transaction.length === 0 && (
        <div className='text-center text-gray-400 dark:text-gray-500'>
          No transactions found
        </div>
      )}
      {!buttonHidden && (
        <div className='flex justify-center items-center'>
          <button
            onClick={handleClick}
            disabled={loading}
            className='bg-[#0b1916] rounded-md hover:bg-[#29574d] text-white dark:hover:bg-[#29574d] disabled:opacity-50 px-5 py-2'>
            <div className=' flex items-center space-x-1'>
              {loading && <Loader className=' animate-spin mr-2' />}
              <div>Load More</div>
            </div>
          </button>
        </div>
      )}
    </div>
    // Object.entries is an object method that returns an array containing keys and values in one array. eg [[key1,value1],[key2,value2]] in or case this should return[[date,{transactions:[],amount:0}]]
  );
}
