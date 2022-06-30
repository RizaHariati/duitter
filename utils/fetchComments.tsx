import { Comment } from "../typing";

export const fetchComments = async (tweetId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getComments/?tweetId=${tweetId}`
  );
  const data = await res.json();
  const comments: Comment[] = data.comments;
  return comments;
};
