import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
export default function PriceCard({
  name,
  price,
  perks,
  ctaHref,
  highlight,
}: {
  name: string;
  price: string;
  perks: string[];
  ctaHref: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-3xl border ${
        highlight
          ? "dark:border-[#17332d] border-white"
          : "dark:border-white border-[#17332d]"
      } dark:bg-[#e1d9d9] bg-[#17332d] text-green-100 dark:text-[#17332d] p-6 shadow-sm hover:shadow-md transition-shadow`}>
      <div className='flex items-baseline justify-between'>
        <h3 className='font-semibold text-lg'>{name}</h3>
        {highlight && (
          <span className='text-xs rounded-full dark:bg-[#17332d] bg-white text-[#17332d] dark:text-green-100 px-2 py-1'>
            Popular
          </span>
        )}
      </div>
      <p className='mt-2 text-3xl font-extrabold'>{price}</p>
      <ul className='mt-4 space-y-2 text-sm dark:text-[#17332d] text-green-100'>
        {perks.map((p) => (
          <li key={p} className='flex gap-2'>
            <CheckCircle2 className='h-5 w-5 mt-0.5' /> {p}
          </li>
        ))}
      </ul>
      <Link
        href={ctaHref}
        className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold ${
          highlight
            ? "dark:bg-[#17332d] bg-white text-[#17332d] dark:text-green-100"
            : "border border-slate-300 hover:bg-[#e1d9d9]"
        }`}>
        Start now <ArrowRight className='h-4 w-4' />
      </Link>
    </div>
  );
}
