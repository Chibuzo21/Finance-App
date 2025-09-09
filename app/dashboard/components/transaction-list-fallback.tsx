import Skeleton from "@/app/components/skeleton";
import React from "react";

export default function TransactionListFallback() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <TransactionSummaryItemSkeleton />
        <TransactionListSkeleton />
        <TransactionListSkeleton />
        <TransactionListSkeleton />
        <TransactionListSkeleton />
      </div>
      <div className="space-y-4">
        <TransactionSummaryItemSkeleton />
        <TransactionListSkeleton />
        <TransactionListSkeleton />
        <TransactionListSkeleton />
        <TransactionListSkeleton />
      </div>
    </div>
  );
}
function TransactionListSkeleton() {
  return (
    <>
      <div className="w-full items-center flex space-x-4">
        <div className="flex grow items-center">
          <Skeleton />
        </div>
        <div className="min-w-[150px] items-center md:flex hidden">
          <Skeleton />
        </div>

        <div className="min-w-[70px] text-right">
          <Skeleton />
        </div>
        <div className="min-w-[50px] items-center flex justify-end">
          <Skeleton />
        </div>
      </div>
    </>
  );
}
function TransactionSummaryItemSkeleton() {
  return (
    <div className="flex space-x-4">
      <div className="grow">
        <Skeleton />
      </div>
      <div className="min-w-[70px] text-right font-semibold">
        <Skeleton />
      </div>
      <div className="min-w-[50px]">
        <Skeleton />
      </div>
    </div>
  );
}
