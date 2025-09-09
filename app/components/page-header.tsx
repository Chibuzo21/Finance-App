import Link from "next/link";
import DarkModeToggle from "./dark-mode-toggle";
import { createClient } from "@/lib/supabase/server";

import { KeyRound } from "lucide-react";
import { sizes, variants } from "@/lib/variants";
import SignOut from "./sign-out";
import Avatar from "./Avatar";

export default async function PageHeader({ className }: { className: string }) {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  return (
    <header className={`flex justify-between items-center ${className}`}>
      <Link
        href='/dashboard'
        className='hover:underline underline-offset-8 text-xl decoration-2'>
        Finance App
      </Link>
      <div className='flex items-center'>
        <DarkModeToggle />
        {user && (
          <Link
            href='/dashboard/settings'
            className={`flex items-center space-x-1 ${variants["ghost"]} ${sizes["sm"]}`}>
            <Avatar />
            <span>{user?.user_metadata.fullName ?? user?.email}</span>
            {/* Recall we added the fullname property in our actions updateSettings.ts */}
          </Link>
        )}
        {user && <SignOut />}
        {!user && (
          <Link href='/login' className={`${variants["ghost"]} ${sizes["sm"]}`}>
            <KeyRound className='w-6 h-6' />
          </Link>
        )}
      </div>
    </header>
  );
}
