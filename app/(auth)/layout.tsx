import { sizes } from "@/lib/variants";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <div className='absolute left-8 top-8'>
        <Link
          href='/'
          className={`dark:bg-white dark:text-[#29574d] ${sizes["base"]} flex justify-center  bg-[#29574d] text-white items-center space-x-2 rounded-sm text-sm font-medium`}>
          <ChevronLeft className='h-4 w-4' />
          <span>Back</span>
        </Link>
      </div>
      <div className='mt-8'>{children}</div>
    </main>
  );
}
