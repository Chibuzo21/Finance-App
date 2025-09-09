import React from "react";
import TrustCard from "./TrustCard";
export default function Trust() {
  return (
    <section id='trust' className='py-20 '>
      <div className=' px-4 sm:px-6 lg:px-8'>
        <h2 className='text-3xl font-bold text-center'>Trusted by thousands</h2>
        <p className='mt-3 text-center text-[#70a79b]'>
          Why people rely on Fintrack
        </p>
        <div className='mt-12 grid md:grid-cols-3 gap-8'>
          <TrustCard
            title='Secure'
            desc='We use bank-level encryption and best security practices.'
          />
          <TrustCard
            title='Accurate'
            desc='Data you can rely on for making financial decisions.'
          />
          <TrustCard
            title='Private'
            desc='Your personal data remains yours, always.'
          />
        </div>
      </div>
    </section>
  );
}
