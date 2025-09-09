"use client";
import { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";
import LandingPageHeader from "./Landing/landing-page-header";

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const Pathname = usePathname();
  const [mount, setMount] = useState(false);
  useEffect(() => {
    setMount(true);
  }, []);
  if (!mount) return null;

  return (
    <ThemeProvider attribute='class'>
      {Pathname === "/" && <LandingPageHeader />}
      <div>{children}</div>
    </ThemeProvider>
  );
}
