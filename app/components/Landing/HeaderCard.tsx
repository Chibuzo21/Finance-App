import React from "react";
import Link from "next/link";

import DarkModeToggle from "../dark-mode-toggle";
type Props = {
  children?: React.ReactNode;
  nav1: React.ReactNode;
  nav2: React.ReactNode;
  nav1Path: string;
};
export default function HeaderCard(props: Props) {
  return (
    <header className='sticky top-0 z-30 backdrop-blur dark:supports-[backdrop-filter]:bg-[#29574d]/70 supports-[backdrop-filter]:bg-white/70 w-full'>
      <nav className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-20 items-center justify-between'>
          <Link href='/' className='flex items-center gap-2'>
            <div className='h-9 w-9 rounded-2xl bg-[#17332d] text-white grid place-items-center font-bold'>
              ƒ
            </div>
            <span className='font-semibold tracking-tight'>Fintrack</span>
          </Link>

          {/* Centered Menu */}
          {props.children}

          <div className='flex items-center gap-3'>
            <DarkModeToggle />
            <Link
              // href='/login'
              href={props.nav1Path}
              className='hidden sm:inline-block  rounded-xl px-4 text-sm font-semibold  '>
              {props.nav1}
            </Link>
            <div className='inline-flex items-center gap-2 text-sm font-semibold hover:text-white shadow-sm hover:shadow transition-shadow  '>
              {props.nav2}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
