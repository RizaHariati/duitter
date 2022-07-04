import {
  ChartBarIcon,
  ChatAlt2Icon,
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Comment, CommentBody, Tweet } from "../typing";
import TimeAgo from "react-timeago";
import { fetchComments } from "../utils/fetchComments";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

interface Props {
  tweet: Tweet;
}
const TweetComponent = ({ tweet }: Props) => {
  const { mainImage } = tweet;
  const [commentsFetched, setCommentsFetched] = useState<Comment[]>([]);
  const [input, setInput] = useState<string>("");
  const [commentBoxVisible, setcommentBoxVisible] = useState(false);

  const refreshComments = async () => {
    const comments: Comment[] = await fetchComments(tweet._id);
    setCommentsFetched(comments);
  };
  const { data: session } = useSession();
  useEffect(() => {
    refreshComments();
  }, []);

  const postComment = async () => {
    const commentInfo: CommentBody = {
      comment: input,
      username: "cantika kirana",
      profileImage: "girl1",
      tweetId: tweet._id,
    };
    const result = await fetch("/api/addComment", {
      body: JSON.stringify(commentInfo),
      method: "POST",
    });
    const json = await result.json();
    const newComments = await fetchComments(tweet._id);

    setInput("");
    setcommentBoxVisible(false);
    toast("Reply Posted!");
    refreshComments();
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    postComment();
  };
  return (
    <div className="grid grid-cols-9 gap-x-5 bg-gray-800 hover:bg-gray-700 cursor-pointer">
      <div className=" col-span-1 pl-5 py-3">
        <Image
          width={40}
          height={40}
          className="rounded-full "
          src={`/images/profilepicture/${tweet.profileImage}.jpg`}
          alt={tweet.profileImage}
        />
      </div>
      <div className="col-span-8 py-3">
        <p className="text-sm capitalize font-bold">
          {tweet.username}
          <span className="ml-2 text-xs font-normal">
            <TimeAgo date={tweet._createdAt} />
          </span>
        </p>
        <p>{tweet.text}</p>

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
      <hr className="col-span-9 border-b border-gray-600 " />
      <div className="grid grid-cols-4 col-start-2 col-span-8 py-3 ">
        <div className="icon-reaction">
          <ChatAlt2Icon
            onClick={() => session && setcommentBoxVisible(!commentBoxVisible)}
            className="w-5 h-5"
          />
          {commentsFetched?.length > 0 && <p>{commentsFetched.length}</p>}
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
      <hr className="col-span-9 border-b gap-5 border-gray-600 " />
      {commentBoxVisible && (
        <form className=" col-start-2 col-span-8 p-5">
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            className=" p-3 flex-1 rounded-lg bg-gray-600 p2 outline-none w-full h-20 mb-3"
            type="text"
            placeholder="Tweet your reply..."
          />
          <button
            type="submit"
            disabled={!input}
            onClick={(e) => handleSubmit(e)}
            className="btn-submit"
          >
            Post
          </button>
        </form>
      )}

      {commentsFetched?.length > 0 ? (
        <>
          <div className=" col-start-2 col-span-8 py-3">
            {commentsFetched.map((item: Comment) => {
              return (
                <div key={item._id} className=" grid grid-cols-9 py-2 ">
                  <div className="col-span-1 pl-5">
                    <Image
                      width={30}
                      height={30}
                      className="rounded-full "
                      src={`/images/profilepicture/${item.profileImage}.jpg`}
                      alt={item.profileImage}
                    />
                  </div>
                  <div className="col-span-7 ">
                    <p className=" capitalize text-xs font-bold">
                      {item.username}
                      <span className="ml-2 font-normal">
                        <TimeAgo date={item._createdAt} />
                      </span>
                    </p>
                    <p>{item.comment}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <hr className="col-span-9 border-b border-gray-600 " />
        </>
      ) : null}
    </div>
  );
};

export default TweetComponent;
