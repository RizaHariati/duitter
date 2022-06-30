import {
  ChartBarIcon,
  ChatAlt2Icon,
  DocumentTextIcon,
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import React, { useEffect } from "react";
import { Comment, Tweet } from "../typing";
import TimeAgo from "react-timeago";
import { fetchComments } from "../utils/fetchComments";

interface Props {
  tweet: Tweet;
}
const TweetComponent = ({ tweet }: Props) => {
  const { mainImage } = tweet;

  const refreshComments = async () => {
    const comments: Comment[] = await fetchComments(tweet._id);
    console.log(comments);
  };
  useEffect(() => {
    refreshComments();
  }, []);

  return (
    <div className="grid grid-cols-9 p-3">
      <div className=" col-span-1">
        <Image
          width={40}
          height={40}
          className="rounded-full "
          src={`/images/profilepicture/${tweet.profileImage}.jpg`}
          alt={tweet.profileImage}
        />
      </div>
      <div className="col-span-8">
        <p>{tweet.username}</p>
        <p>{tweet.text}</p>
        <TimeAgo date={tweet._createdAt} />
        {mainImage ? (
          <div className="mt-5 rounded overflow-hidden max-w-md h-60">
            <Image
              priority
              width={300}
              height={200}
              layout="responsive"
              src={`/images/randompicture/${tweet.mainImage}.jpg`}
              alt={tweet.mainImage}
            />
          </div>
        ) : null}
      </div>
      <div className="grid grid-cols-4 col-start-2 col-span-8 mt-1  ">
        <div className="icon-reaction">
          <ChatAlt2Icon className="w-5 h-5" />
          <p>5</p>
        </div>

        <div className="icon-reaction">
          <SwitchHorizontalIcon className="w-5 h-5" />
          <p>5</p>
        </div>

        <div className="icon-reaction">
          <HeartIcon className="w-5 h-5 rounded-full " />
          <p>5</p>
        </div>

        <div className="icon-reaction">
          <UploadIcon className="w-5 h-5" />
          <p>5</p>
        </div>
      </div>
    </div>
  );
};

export default TweetComponent;
