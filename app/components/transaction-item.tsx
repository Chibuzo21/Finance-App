import { HandCoins, Landmark, Pencil, PiggyBank, Wallet } from "lucide-react";
import useFormatCurrency from "../hooks/use-format-currency";
import RemoveButton from "../dashboard/components/removeButton";
import Link from "next/link";
import { variants, sizes } from "@/lib/variants";

export type TransactionProps = {
  type: keyof typeof typesMap;
  category?: string;
  amount: number;
  description: string;
  id: number;
  onRemoved: () => void;
};
const typesMap = {
  Income: {
    icon: HandCoins,
    colors: "text-green-500 dark:text-green-400",
  },
  Expenses: {
    icon: Wallet,
    colors: "text-red-500 dark:text-red-400",
  },
  Savings: {
    icon: Landmark,
    colors: "text-indigo-500 dark:text-indigo-400",
  },
  Investment: {
    icon: PiggyBank,
    colors: "text-yellow-500 dark:text-yellow-400",
  },
};
export default function TransactionItem({
  type,
  category,
  amount,
  description,
  id,
  onRemoved,
}: TransactionProps) {
  const FormattedAmount = useFormatCurrency(amount);
  const IconComponent = typesMap[type].icon;
  const colors = typesMap[type].colors;
  return (
    <div className='w-full items-center flex'>
      <div className='flex grow items-center mr-4'>
        <IconComponent className={`${colors} h-4 w-4 sm:block hidden mr-2`} />
        <span>{description}</span>
      </div>
      <div className='min-w-[150px] items-center md:flex hidden'>
        {category && (
          <div className='text-xs rounded-md bg-gray-700 text-gray-100 dark:text-black dark:bg-gray-100 px-2 py-0.5'>
            {category}
          </div>
        )}
      </div>
      <div className='min-w-[70px] text-right'>{FormattedAmount}</div>
      <div className='min-w-[100px] items-center flex justify-end'>
        <Link
          href={`/dashboard/transaction/${id}/edit`}
          className={`${variants["ghost"]} border-[1px] mx-2 border-gray-400  ${sizes["xs"]}`}>
          <Pencil className='h-4 w-4' />
        </Link>
        <RemoveButton id={id} onRemoved={onRemoved} />
      </div>
    </div>
  );
}
