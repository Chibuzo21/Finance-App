import React from "react";

import { ArrowRight } from "lucide-react";
import HeaderCard from "./HeaderCard";
import Link from "next/link";
export default function LandingPageHeader() {
  return (
    <HeaderCard
      nav1={
        <span className='py-2 hover:bg-slate-300 hover:text-[#17332d] px-3 rounded-md'>
          Log in
        </span>
      }
      nav1Path='/login'
      nav2={
        <Link
          href='/signup'
          className='inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold bg-[#17332d] text-white shadow-sm hover:shadow transition-shadow hover:bg-[#29574d]'>
          Get started <ArrowRight className='h-4 w-4' />
        </Link>
      }>
      <ul className='hidden md:flex items-center gap-8 text-sm font-medium mx-auto'>
        <li>
          <a href='#features' className=' dark:hover:text-[#17332d]'>
            Features
          </a>
        </li>

        <li>
          <a href='#trust' className='hover:text-[#17332d]'>
            Trust
          </a>
        </li>
        <li>
          <a href='#pricing' className='hover:text-[#17332d]'>
            Pricing
          </a>
        </li>
      </ul>
    </HeaderCard>
  );
}
