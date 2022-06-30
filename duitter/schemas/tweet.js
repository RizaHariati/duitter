export default {
  name: "tweet",
  title: "Tweet",
  type: "document",
  initialValue: {
    blockTweet: false,
  },
  fields: [
    {
      name: "text",
      title: "Text in Tweet",
      type: "string",
    },
    {
      name: "blockTweet",
      title: "Block Tweet",
      description: "Admin Controls: Toggle if tweet is deemed inappropriate",
      type: "boolean",
    },
    {
      name: "username",
      title: "Username",
      type: "string",
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "string",
    },
    {
      name: "profileImage",
      title: "Profile image",
      type: "string",
    },
  ],

  preview: {
    select: {
      title: "text",
    },
  },
};
