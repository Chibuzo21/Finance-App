"use client";

import Features from "./components/Landing/Features";
import Trust from "./components/Landing/Trust";
import Price from "./components/Landing/Price";
import LeftHeroPage from "./components/Landing/LeftHeroPage";
import RightHeroPage from "./components/Landing/RightHeroPage";
export default function FinanceLandingPage() {
  return (
    <div className='min-h-screen '>
      <section className='relative overflow-hidden'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-16 lg:py-24'>
            <LeftHeroPage />

            <RightHeroPage />
          </div>
        </div>
      </section>
      <Features />
      <Trust />
      <Price />
    </div>
  );
}
