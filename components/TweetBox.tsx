import {
  CalendarIcon,
  DatabaseIcon,
  EmojiHappyIcon,
  GiftIcon,
  GlobeIcon,
  PhotographIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { Tweet, TweetBody } from "../typing";
import { fetchTweets } from "../utils/fetchTweets";

interface Props {
  setTweets: React.Dispatch<React.SetStateAction<Tweet[]>>;
}

const TweetBox = ({ setTweets }: Props) => {
  const [typing, setTyping] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [imageUrlOpen, setImageUrlOpen] = useState<boolean>(false);
  const { data: session } = useSession();
  const imageInputRef = useRef<HTMLInputElement>(null);

  const addImageToTweet = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!imageInputRef.current?.value) return;
    setImage(imageInputRef.current.value);
    imageInputRef.current.value = "";
    setImageUrlOpen(false);
  };

  const postTweet = async () => {
    const tweetInfo: TweetBody = {
      text: input,
      username: session?.user?.name || "Riza hariati",
      profileImage: "Profile",
      mainImage: image,
    };

    const result = await fetch("/api/addTweet", {
      body: JSON.stringify(tweetInfo),
      method: "POST",
    });
    const json = await result.json();
    const newTweets = await fetchTweets();
    setTweets(newTweets);
    setImage("");
    setImageUrlOpen(false);
    setInput("");
    toast("Tweet Posted!!");
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    postTweet();
  };
  return (
    <div className="grid grid-cols-9 p-3">
      <div className=" col-span-1">
        <Image
          width={40}
          height={40}
          className="rounded-full "
          src={
            session?.user?.image
              ? `${session?.user?.image}`
              : "/images/profilepicture/Profile.jpg"
          }
        />
      </div>
      <form className="col-span-8">
        <input
          value={input}
          onChange={(e) => {
            e.preventDefault();
            setInput(e.target.value);
          }}
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
            <PhotographIcon
              onClick={() => setImageUrlOpen(!imageUrlOpen)}
              className="icon-link"
            />
            <GiftIcon className="icon-link" />
            <DatabaseIcon className="icon-link" />
            <EmojiHappyIcon className="icon-link" />
            <CalendarIcon className="icon-link" />
          </div>
          <button
            onClick={(e) => handleSubmit(e)}
            disabled={!typing || !session}
            type="submit"
            className="btn-submit"
          >
            <p className=" text-sm ">Duit</p>
          </button>
        </div>

        {imageUrlOpen && (
          <form className=" col-span-8 col-start-2 flex flex-col  w-full border-b border-gray-600 py-3 ">
            <input
              ref={imageInputRef}
              type="text"
              placeholder="input image name..."
              className="flex-1 bg-transparent p-2 text-white outline-none   placeholder:text-white"
            />
            <button
              disabled={!session}
              type="submit"
              className="w-32 py-1 ml-auto rounded-full bg-sky-600  hover:bg-sky-700 disabled:opacity-50 transition-all text-white font-medium"
              onClick={(e) => addImageToTweet(e)}
            >
              AddImage
            </button>
          </form>
        )}
        {image && (
          <div className="mt-5 w-52 mx-auto  rounded overflow-hidden max-w-md h-32">
            <Image
              priority
              width={200}
              height={160}
              layout="responsive"
              className="object-fit object-center"
              src={`/images/randompicture/${image}.jpg`}
              alt={image}
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default TweetBox;
