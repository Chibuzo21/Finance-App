import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
export default function LeftHeroPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='space-y-6'>
      <h1 className='text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1]'>
        Take control of your money effortlessly
      </h1>
      <p className='text-base sm:text-lg text-[#70a79b] max-w-xl'>
        Track spending, set budgets, and see all your accounts in one secure
        dashboard. Built for speed, clarity, and peace of mind.
      </p>
      <div className='flex flex-col sm:flex-row gap-3 pt-2'>
        <Link
          href='/signup'
          className='inline-flex justify-center items-center rounded-2xl px-5 py-3 text-sm font-semibold dark:text-[#17332d] bg-[#17332d] hover:text-white dark:bg-white text-green-100  hover:bg-[#29574d]   shadow-sm hover:shadow-md'>
          Create free account
        </Link>
        <Link
          href='/login'
          className='inline-flex justify-center items-center rounded-2xl px-5 py-3 text-sm font-semibold border border-slate-300 hover:bg-[#29574d] hover:text-green-100'>
          I already have an account
        </Link>
      </div>
      <div className='flex items-center gap-4 pt-2'>
        <div className='flex -space-x-2'>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className='h-8 w-8 rounded-full border-2 border-white bg-slate-200'
            />
          ))}
        </div>
        <p className='text-xs text-[#70a79b]'>
          Trusted by 12,000+ users worldwide
        </p>
      </div>
    </motion.div>
  );
}
