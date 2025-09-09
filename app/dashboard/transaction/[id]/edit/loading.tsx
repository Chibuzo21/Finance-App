import Skeleton from "@/app/components/skeleton";
import React from "react";

export default function Loading() {
  return (
    <>
      <h1 className="font-semibold text-4xl mb-8">Edit Transaction</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Skeleton className="h-12" />
        <Skeleton className="h-12" />
        <Skeleton className="h-12" />
        <Skeleton className="h-12" />
        <Skeleton className="h-12" />
        <Skeleton className="h-12" />
        <Skeleton className="h-12 md:col-span-2" />
      </div>
    </>
  );
}
// loading.js is used when you want to load an entire route/page and suspense is for loading a section/component inside the page.
