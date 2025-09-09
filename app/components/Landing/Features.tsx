import React from "react";
import FeatureCard from "./FeatureCard";
import { Wallet, LineChart, Smartphone } from "lucide-react";
export default function Features() {
  return (
    <section id='features' className='py-20 '>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <h2 className='text-3xl font-bold text-center'>Powerful Features</h2>
        <p className='mt-3 text-center text-[#70a79b]'>
          Everything you need to manage your finances in one place.
        </p>
        <div className='mt-12 grid md:grid-cols-3 gap-8'>
          <FeatureCard
            icon={<Wallet className='h-5 w-5' />}
            title='Budgeting'
            desc='Set budgets, track spending and stay on top of your finances.'
          />
          <FeatureCard
            icon={<LineChart className='h-5 w-5' />}
            title='Analytics'
            desc='Visualize spending trends and make smarter decisions.'
          />
          <FeatureCard
            icon={<Smartphone className='h-5 w-5' />}
            title='Mobile Access'
            desc='Access your dashboard on any device, anytime.'
          />
        </div>
      </div>
    </section>
  );
}
