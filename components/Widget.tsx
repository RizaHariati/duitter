import { SearchIcon } from "@heroicons/react/outline";
import React from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";
const Widget = () => {
  return (
    <div className="hidden lg:block h-full w-full col-span-3 p-5">
      {/* ---------------------------- search ---------------------------- */}
      <div className="flex items-center gap-2 bg-gray-600 p-3 rounded-full ">
        <SearchIcon className="w-5 h-5" />
        <input
          type="text"
          placeholder="Search Duitter"
          className="flex-1 bg-transparent text-gray-100 focus:ring-0 focus:outline-none outline-none"
        />
      </div>
      <div className="mt-5">
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="rizahariati"
          options={{ height: "80vh" }}
        />
      </div>
    </div>
  );
};

export default Widget;
