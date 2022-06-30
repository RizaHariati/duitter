import React from "react";
import { RefreshIcon } from "@heroicons/react/outline";
import TweetBox from "./TweetBox";
import { Tweet } from "../typing";
import TweetComponent from "./TweetComponent";

interface Props {
  tweets: Tweet[];
}
const Feed = ({ tweets }: Props) => {
  return (
    <div className="h-full w-full border-l border-r border-gray-600 col-span-6 md:col-span-5">
      {/* ---------------------------- header ---------------------------- */}
      <div className="w-full text-xl font-bold flex items-center justify-between p-5 text-sky-400">
        <h1>Home</h1>
        <RefreshIcon className="w-8 h-8 hover:rotate-180 cursor-pointer duration-300 transition-all active:scale-125" />
      </div>

      {/* --------------------------- tweetBox --------------------------- */}
      <TweetBox />
      <div>
        {tweets.map((tweet: Tweet) => {
          return <TweetComponent key={tweet._id} tweet={tweet} />;
        })}
      </div>
    </div>
  );
};

export default Feed;
