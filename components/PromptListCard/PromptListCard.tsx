import React from "react";
import { IPrompt } from "../../typescript";
import handleCopy from "../../utils/handleCopy";
import replaceInstanceAndClass from "../../utils/replaceInstanceAndClass";

interface IPromptListCard {
  prompt: IPrompt;
  instancePrompt: string;
  classPrompt: string;
}

const PromptListCard = ({
  prompt,
  instancePrompt,
  classPrompt,
}: IPromptListCard) => {
  return (
    <>
      <div className="relative opacity-60">
        <button
          className="absolute rounded-3xl right-0 w-1/4 hidden group-hover:block font-light m-1 hover:scale-90"
          onClick={() =>
            handleCopy(
              replaceInstanceAndClass(
                prompt.prompt,
                instancePrompt,
                classPrompt
              )
            )
          }
        >
          Copy
        </button>
        <button className="absolute rounded-3xl left-0 w-1/4 hidden group-hover:block font-light m-1 hover:scale-90">
          Kudos
        </button>
      </div>
      <div
        className=" absolute bottom-0 w-full  overflow-hidden shadow-lg 
    bg-gradient-to-r from-gray-700 via-gray-900 to-black opacity-60
    
    "
      >
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-violet-300"></div>
          <p className="text-white text-base font-light">
            {replaceInstanceAndClass(
              prompt.prompt,
              instancePrompt,
              classPrompt
            )}
          </p>
        </div>
        <div className="px-4 font-light">
          <span className="cursor-pointer inline-block bg-black rounded-full px-3 py-1 text-sm  text-white mr-2 mb-2">
            Posted by : {prompt.username}
          </span>
        </div>
      </div>
    </>
  );
};

export default PromptListCard;
