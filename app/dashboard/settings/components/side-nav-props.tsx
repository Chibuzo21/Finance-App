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
export default function sideNavProps({ path, Icon, text }: SideNav) {
  const pathname = usePathname();
  return (
    <li>
      <Link
        href={`/dashboard/settings/${path}`}
        className={`py-2 px-2.5 flex items-center space-x-2 dark:hover:bg-gray-800 rounded-md hover:bg-gray-100 ${
          pathname === `/dashboard/settings/${path}`
            ? "bg-gray-100 dark:bg-gray-800"
            : ""
        }`}>
        <Icon className='h-4 w-4' />
        <span>{text}</span>
      </Link>
    </li>
  );
}
