"use client";
import DateRangeSelect from "@/app/components/date-range-select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { TrendsType } from "./Trends";
export default function Range({
  defaultView,
}: {
  defaultView: TrendsType["range"];
}) {
  const searchParams = useSearchParams();
  //   usesearchParams returns the url of a searchparameter or query parameter (everything that comes after the ? in a url and is usually in a key-value pair)
  const pathname = usePathname();
  // usePathname returns all the current url/route of a page
  const { replace } = useRouter();
  const range = searchParams.get("range") ?? defaultView ?? "last30days";
  //   the get method is used on the key "range" and it returns a value. if no value exists then it returns "last30days"

  return (
    <DateRangeSelect
      value={range}
      onChange={(e) => {
        const params = new URLSearchParams();
        // urlsearchparams is used to manipulate or mutate search parameters
        params.set("range", e.target.value);
        replace(`${pathname}?${params.toString()}`);
      }}
    />
  );
}
