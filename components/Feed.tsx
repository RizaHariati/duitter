import React, { useState } from "react";
import { RefreshIcon } from "@heroicons/react/outline";
import TweetBox from "./TweetBox";
import { Tweet } from "../typing";
import TweetComponent from "./TweetComponent";
import { useRouter } from "next/router";
import { fetchTweets } from "../utils/fetchTweets";
import toast from "react-hot-toast";

interface Props {
  tweets: Tweet[];
}
const Feed = ({ tweets: tweetsProp }: Props) => {
  const [tweets, setTweets] = useState<Tweet[]>(tweetsProp);
  const handleRefresh = async () => {
    const refreshToast = toast.loading("Refreshing..");
    const tweets = await fetchTweets();
    setTweets(tweets);
    toast.success("Feed Updated", {
      id: refreshToast,
    });
  };
  return (
    <div className="h-screen overflow-y-scroll w-full border-l border-r border-gray-600 col-span-6 md:col-span-5">
      {/* ---------------------------- header ---------------------------- */}
      <div className="w-full text-xl border-b border-gray-600 font-bold flex items-center justify-between p-5 text-sky-400">
        <h1>Home</h1>

        <RefreshIcon
          onClick={() => handleRefresh()}
          className="w-8 h-8 hover:rotate-180 cursor-pointer duration-300 transition-all active:scale-125"
        />
      </div>

      {/* --------------------------- tweetBox --------------------------- */}
      <TweetBox setTweets={setTweets} />
      <div>
        {tweets.map((tweet: Tweet) => {
          return <TweetComponent key={tweet._id} tweet={tweet} />;
        })}
      </div>
    </div>
  );
};

export default Feed;
