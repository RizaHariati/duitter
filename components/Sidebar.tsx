import React from "react";
import {
  BellIcon,
  HashtagIcon,
  BookmarkIcon,
  CollectionIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
  MailIcon,
  UserIcon,
  HomeIcon,
  PencilIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import Image from "next/image";
import SidebarRow from "./SidebarRow";
import { signIn, signOut, useSession } from "next-auth/react";
const Sidebar = () => {
  const { data: session } = useSession();
  return (
    <div className="h-screen w-full col-span-1 md:col-span-2 py-5 flex flex-col justify-between items-center">
      <div>
        <Link href="/">
          <img
            src="https://links.papareact.com/drq"
            alt="logo"
            className="w-10 h-10"
          />
        </Link>
        {/* ------------------------- Duitter logo ------------------------- */}

        {/* ------------------------- Duitter links ------------------------ */}

        {/* -------------------------- Duit button ------------------------- */}
        <div>
          <SidebarRow Icon={HomeIcon} title="Home" />
          <SidebarRow Icon={HashtagIcon} title="Explore" />
          <SidebarRow Icon={BellIcon} title="Notification" />
          <SidebarRow Icon={MailIcon} title="Messages" />
          <SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
          <SidebarRow Icon={CollectionIcon} title="Lists" />
          <SidebarRow
            onClick={session ? signOut : signIn}
            Icon={UserIcon}
            title={session ? "Sign Out" : "Sign In"}
          />
          <SidebarRow Icon={DotsCircleHorizontalIcon} title="More" />
        </div>

        <button
          className="w-10 md:w-32 lg:w-44 py-2 mx-auto my-3
        rounded-full bg-sky-600  hover:bg-sky-700 transition-all text-white font-medium"
        >
          <p className="hidden md:inline-block">Duit</p>
          <PencilIcon className="inline-block md:hidden w-5 h-5" />
        </button>
      </div>
      <button className="w-full flex items-center justify-between pl-2 pr-4 hover:bg-slate-700 rounded-full py-1">
        {/* ------------------------- Duit profile ------------------------- */}

        <div className="flex gap-2 items-center justify-center mx-auto md:mx-0">
          <Image
            width={30}
            height={30}
            className="rounded-full "
            src="/images/profilepicture/profile.jpg"
          />
          <div className="hidden md:block">
            <h4 className="text-sm ">Riza Hariati</h4>
            <p className="text-xs">@rizahariati</p>
          </div>
        </div>
        <DotsHorizontalIcon className="w-2 h-2 hidden md:block" />
      </button>
    </div>
  );
};

export default Sidebar;
