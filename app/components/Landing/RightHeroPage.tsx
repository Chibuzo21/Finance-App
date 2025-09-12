import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import Image from "next/image";
export default function RightHeroPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className='relative'>
      <div className='relative rounded-3xl shadow-sm p-4 sm:p-6 lg:p-8'>
        <Image
          src='/phone.png'
          alt='Phone image '
          // className=' w-full h-auto'
          width={400}
          height={400}
        />
        {/* <div className='flex items-center justify-between pb-4'>
          <div className='h-6 w-40 bg-slate-100 rounded' />
          <div className='h-6 w-20 bg-slate-100 rounded' />
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div className='rounded-2xl border border-slate-200 p-4'>
            <div className='h-24 w-full rounded-xl bg-slate-100' />
            <div className='mt-3 h-3 w-1/2 rounded bg-slate-100' />
          </div>
          <div className='rounded-2xl border border-slate-200 p-4'>
            <div className='h-24 w-full rounded-xl bg-slate-100' />
            <div className='mt-3 h-3 w-1/2 rounded bg-slate-100' />
          </div>
          <div className='col-span-2 rounded-2xl border border-slate-200 p-4'>
            <div className='h-40 w-full rounded-xl bg-slate-100' />
            <div className='mt-3 h-3 w-1/3 rounded bg-slate-100' />
          </div>
        </div> */}
      </div>
      <div className='absolute -bottom-6 -right-6 hidden sm:block'>
        <div className='rounded-2xl border border-slate-200 dark:bg-white p-3 shadow-sm bg-[#17332d]'>
          <div className='flex items-center gap-2 text-sm font-semibold dark:text-[#17332d] text-green-100'>
            <ShieldCheck className='h-4 w-4' />
            Bank-grade security
          </div>
        </div>
      </div>
    </motion.div>
  );
}
