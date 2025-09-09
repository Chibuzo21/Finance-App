"use client";

import React from "react";
import { User, Camera, Settings } from "lucide-react";
import SideNavProps from "./side-nav-props";

export default function SideNav() {
  return (
    <nav>
      <ul className='space-y-2'>
        <SideNavProps path='' text='Settings' Icon={Settings} />
        <SideNavProps path='avatar' text='Avatar' Icon={User} />
        <SideNavProps path='profile' text='Profile' Icon={Camera} />
      </ul>
    </nav>
  );
}
