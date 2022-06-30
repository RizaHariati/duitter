import {
  CalendarIcon,
  DatabaseIcon,
  EmojiHappyIcon,
  GiftIcon,
  GlobeIcon,
  PhotographIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import React, { useState } from "react";

const TweetBox = () => {
  const [typing, setTyping] = useState(false);
  return (
    <div className="grid grid-cols-9 p-3">
      <div className=" col-span-1">
        <Image
          width={40}
          height={40}
          className="rounded-full "
          src="/images/profilepicture/profile.jpg"
        />
      </div>
      <form className="col-span-8">
        <input
          onFocus={() => setTyping(true)}
          placeholder="What's happening"
          className="bg-transparent outline-none focus:outline-none w-full h-10"
        />
        {typing && (
          <div className="flex gap-2 items-center w-full pb-3 border-b border-slate-600">
            <GlobeIcon className="text-sky-400 w-4 h-4" />
            <p className="text-sky-400 text-xs ">Everyone can reply</p>
          </div>
        )}
        <div className="flex items-center justify-between w-full py-2 border-b border-slate-600">
          <div className="flex gap-2 ">
            <PhotographIcon className="icon-link" />
            <GiftIcon className="icon-link" />
            <DatabaseIcon className="icon-link" />
            <EmojiHappyIcon className="icon-link" />
            <CalendarIcon className="icon-link" />
          </div>
          <button
            disabled={!typing}
            type="submit"
            className="w-32 py-1 ml-auto rounded-full bg-sky-600  hover:bg-sky-700 disabled:opacity-50 transition-all text-white font-medium"
          >
            <p className=" text-sm ">Duit</p>
          </button>
        </div>
      </form>
    </div>
  );
};

export default TweetBox;
