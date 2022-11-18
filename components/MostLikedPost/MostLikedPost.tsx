import React from "react";
import { IPrompt } from "../../typescript";

interface IMostLikedPost {
  data: IPrompt[];
}

const MostLikedPost = ({ data }: IMostLikedPost) => {
  const mostKudosArray = data.sort((a: IPrompt, b: IPrompt) => {
    return a.kudos - b.kudos > 0 ? -1 : 1;
  });

  return (
    <div className="p-4 w-[30vw] h-[75vh] max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-black/50 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col space-y-2">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Most Popular Imaginations
          </h5>
          <span className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {" "}
            Total Number Of Imaginations So Far : {data.length}
          </span>
        </div>
      </div>
      <div className="flow-root list-item ">
        <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700 overflow-auto  h-[65vh] scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100">
          {mostKudosArray.map((image: IPrompt) => (
            <li className="pb-3 sm:pb-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={image.render_image}
                    alt="prompt render"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    Posted By : {image.username} ({image.kudos} ❤️)
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MostLikedPost;
