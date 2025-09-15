import { createClient } from "@/lib/supabase/server";
import HeaderCard from "../components/Landing/HeaderCard";
import { KeyRound } from "lucide-react";
import Avatar from "../components/Avatar";
import SignOut from "../components/sign-out";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <>
      <HeaderCard
        nav1={
          user && (
            <div className='flex hover:bg-[#1a3a3258] px-3  rounded-md items-center space-x-4'>
              <Avatar />
              <span className='hidden sm:flex'>
                {user?.user_metadata.fullName ?? user?.user_metadata.username}
              </span>
              {/* Recall we added the fullname property in our actions updateSettings.ts */}
            </div>
          )
        }
        nav1Path='/dashboard/settings'
        nav2={
          <>
            {user && <SignOut />}
            {!user && <KeyRound className='w-6 h-6' />}
          </>
        }
      />

      <div className='Wrapper max-w-6xl py-10 mx-auto container'>
        {children}
      </div>
    </>
  );
}
