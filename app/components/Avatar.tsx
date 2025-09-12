import { createClient } from "@/lib/supabase/server";
import { CircleUser } from "lucide-react";
import Image from "next/image";
import React from "react";

type HW = {
  width?: number;
  height?: number;
};
export default async function Avatar({ width = 32, height = 32 }: HW) {
  // Get user: This is so that this file will only be accessible to the signed in user

  //   Signed URL - 5 mins : This is generating  a url for the file which will be available to the public for just 5 mins
  // <image>, configure : Here we use the Image tag and configure it in a way that it can access the avatar from the supabase
  //   Default: adding a default icon if the user has not uploaded his image
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let Avatar = user?.user_metadata.avatar;
  if (!user || !Avatar) {
    return <CircleUser className='h-6 w-6' />;
  }

  const { data, error } = await supabase.storage
    .from("Avatars")
    .createSignedUrl(Avatar, 60 * 5);
  // Recall that we uploaded the avatar to the metadata earlier, now we are trying to create a url for that file which will be available to the public for only 5 mins (60 secs * 5), this could be available for download. This is due to the fact we used row level security to secure our bucket so as to make it available only for the logged user
  // if the bucket was public, then getPublicUrl will be used in place of createSignedUrl

  if (error) return <CircleUser className='h-6 w-6' />;
  return (
    <Image
      src={data?.signedUrl}
      alt='User avatar'
      height={height}
      width={width}
      className='rounded-full h-10 w-10 object-cover'
    />
  );
}
