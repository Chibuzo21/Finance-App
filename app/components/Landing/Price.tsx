import React from "react";
import PriceCard from "./PriceCard";
export default function Price() {
  return (
    <section id='pricing' className='py-20'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <h2 className='text-3xl font-bold text-center'>Simple Pricing</h2>
        <p className='mt-3 text-center text-[#70a79b]'>
          Choose the plan that fits your needs
        </p>
        <div className='mt-12 grid md:grid-cols-3 gap-8'>
          <PriceCard
            name='Starter'
            price='$0'
            perks={["Track expenses", "Basic budgeting", "Secure sync"]}
            ctaHref='/signup'
          />
          <PriceCard
            name='Pro'
            price='$9/mo'
            perks={[
              "Advanced analytics",
              "Multiple accounts",
              "Priority support",
            ]}
            ctaHref='/signup'
            highlight
          />
          <PriceCard
            name='Enterprise'
            price='Custom'
            perks={[
              "Dedicated support",
              "Team accounts",
              "Custom integrations",
            ]}
            ctaHref='/signup'
          />
        </div>
      </div>
    </section>
  );
}
