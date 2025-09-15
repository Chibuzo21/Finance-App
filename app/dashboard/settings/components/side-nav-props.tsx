import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SideNav from "./side-nav";
import { LucideIcon } from "lucide-react";

type SideNav = {
  path?: string;
  Icon: LucideIcon;
  text: string;
};
export default function SideNavProps({ path, Icon, text }: SideNav) {
  const pathname = usePathname();
  return (
    <li>
      <Link
        href={`/dashboard/settings/${path}`}
        className={`py-2 px-2.5 flex items-center space-x-2  rounded-md  ${
          pathname === `/dashboard/settings/${path}`
            ? "bg-gray-200 dark:bg-[#21423b]"
            : ""
        }`}>
        <Icon className='h-4 w-4' />
        <span>{text}</span>
      </Link>
    </li>
  );
}
