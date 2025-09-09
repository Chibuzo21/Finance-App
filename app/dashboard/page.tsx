import { Suspense } from "react";

import TransactionListFallback from "./components/transaction-list-fallback";
import Trend from "./components/Trends";
import { TransactionProps } from "@/app/components/transaction-item";
import TrendFallback from "../components/TrendFallback";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { sizes, variants } from "@/lib/variants";
import { createClient } from "@/lib/supabase/server";
import { ErrorBoundary } from "react-error-boundary";
import Range from "./components/range";
import { TrendsType } from "./components/Trends";
import TransactionListWrapper from "./components/transaction-list-wrapper";

type SearchParams = Promise<{
  range: TrendsType["range"];
}>;
export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const supabase = await createClient();
  // console.log(await supabase.from("transactions").select());
  // The above is us fetching data from our database which was labelled transactions
  // searchParams objects which is passed as a prop here comes from the App router in nextjs, it contains query parameters from the URL. eg if URL is /blog?tags=javascript,typescript&page=2 then searchParams={tags:"javascript,typescript",page:"2"}. it represents everything that comes after the question mark known as query parameters or query strings. it contains key value pairs
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const settings = user?.user_metadata;

  const range =
    (await searchParams).range ?? settings?.defaultView ?? "last30days";
  function SuspenseTrend({ type }: { type: TransactionProps["type"] }) {
    return (
      <ErrorBoundary
        fallback={
          <div className='text-red-500'> Cannot fetch {type} Trend data</div>
        }>
        <Suspense fallback={<TrendFallback />}>
          <Trend type={type} range={range} />
        </Suspense>
      </ErrorBoundary>
    );
  }
  return (
    <main>
      <section className='mb-8 flex items-center justify-between'>
        <h1 className='text-4xl font-semibold'>Summary</h1>
        <aside>
          <Range defaultView={settings?.defaultView} />
        </aside>
      </section>
      <section className='grid grid-cols-2 lg:grid-cols-4 gap-8 mb-8'>
        <SuspenseTrend type='Income' />
        <SuspenseTrend type='Expenses' />
        <SuspenseTrend type='Savings' />
        <SuspenseTrend type='Investment' />
      </section>
      <section className='flex items-center mb-8 justify-between'>
        <h2 className='text-2xl'>Transactions</h2>
        <Link
          href='/dashboard/transaction/add'
          className={`flex items-center space-x-1 ${variants["outline"]} ${sizes["sm"]}`}>
          <PlusCircle className='h-4 w-4' />
          <div>Add</div>
        </Link>
      </section>
      <Suspense fallback={<TransactionListFallback />}>
        <TransactionListWrapper range={range} />
      </Suspense>
    </main>
  );
}
