import { User, group } from "@/app/dashboard/components/transaction-list";
export const groupAndSumTransactionsByDate = (transactions: User[]) => {
  const grouped: group = {};
  for (const transaction of transactions) {
    const date = transaction.created_at.split("T")[0];
    // split is a string method that converts a string to an array, we are using letter ("T") to show where the first element in the array should stop and the second one should start. By adding [0], we say that we are interested in the first element

    if (!grouped[date]) {
      grouped[date] = { transactions: [], amount: 0 };
      //   This simply creates a date property inside the grouped object with its value being an object ie grouped={date:{transactions:[],amount:0}}
    }
    grouped[date].transactions.push(transaction);
    const amount =
      transaction.type === "Expenses"
        ? -transaction.amount
        : transaction.amount;
    grouped[date].amount += amount;
  }
  return grouped;
};
