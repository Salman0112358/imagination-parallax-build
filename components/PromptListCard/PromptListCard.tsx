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
  const remixedImageObject = {};

  return (
    <div
      className=" relative max-w-sm rounded overflow-hidden shadow-lg 
    bg-gradient-to-r from-gray-700 via-gray-900 to-black
    
    "
    >
      <div className="relative">
        <button
          className="m-1 rounded-md absolute top-0 w-full hidden group-hover:block font-semibold text-white bg-violet-500/50"
          onClick={() => handleCopy(prompt.prompt)}
        >
          Copy Prompt
        </button>
        <img
          className="w-full h-full"
          src={prompt.render_image}
          alt="Sunset in the mountains"
        />
      </div>

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-violet-300"></div>
        <p className="text-white text-base font-light">
          {replaceInstanceAndClass(prompt.prompt, instancePrompt, classPrompt)}
        </p>
      </div>
      <div className="px-4 font-light">
        <span className="cursor-pointer inline-block bg-black rounded-full px-3 py-1 text-sm  text-white mr-2 mb-2">
          Guidance
        </span>
        <span className="cursor-pointer inline-block bg-black rounded-full px-3 py-1 text-sm  text-white mr-2 mb-2">
          Dimensions
        </span>
        <span className="cursor-pointer inline-block bg-black rounded-full px-3 py-1 text-sm  text-white mr-2 mb-2">
          Seed
        </span>
      </div>
    </div>
  );
};

export default PromptListCard;
