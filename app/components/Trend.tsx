import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { useMemo } from "react";
import useFormatCurrency from "../hooks/use-format-currency";

export type trendProps = {
  type: "Income" | "Expenses" | "Investment" | "Savings";
  amount: number;
  prevAmount?: number;
};
export default function Trend({ type, amount, prevAmount }: trendProps) {
  // type of data its representing, income,expenses
  // amount: current amount.
  // prevAmount: previous amount
  const colorClasses = {
    Income: "text-green-700 dark:text-green-300",
    Expenses: "text-red-700 dark:text-red-300",
    Investment: "text-indigo-700 dark:text-indigo-300",
    Savings: "text-yellow-700 dark:text-yellow-300",
  };
  const calcPercentageChange = (amount: number, prevAmount?: number) => {
    // this amount returns difference in percentage
    if (
      typeof prevAmount === "undefined" ||
      typeof amount === "undefined" ||
      prevAmount === 0
    )
      return 0;
    else {
      return ((amount - prevAmount) / prevAmount) * 100;
    }
  };
  const percentageChange = useMemo(
    () => calcPercentageChange(amount, prevAmount).toFixed(0),
    [amount, prevAmount]
    // toFixed function converts a number to a string, the digit in bracket represents the number of digits to appear after decimal point
  );
  // useMemo is used to cache the result of a recomputation so that it's only recalculated when the dependecies change. it makes use of two parameters, the function which always run and the dependencies which the function depend on its changes to perform
  const FormattedAmount = useFormatCurrency(amount);
  return (
    <div>
      <div className={`font-semibold ${colorClasses[type]}`}>{type}</div>
      <div className="text-black dark:text-white mb-2 font-semibold text-xl">
        {FormattedAmount}
      </div>
      <div className="flex space-x-1 items-center text-sm">
        {Number(percentageChange) <= 0 && (
          <ArrowDownLeft className="text-red-700 dark:text-red-300" />
        )}
        {Number(percentageChange) > 0 && (
          <ArrowUpRight className="text-green-700 dark:text-green-300" />
        )}
        <div>{percentageChange}% vs last period</div>
      </div>
    </div>
  );
}
