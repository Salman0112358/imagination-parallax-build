import React from "react";
import { IPrompt } from "../../typescript";
import Image from "next/image";
import replaceInstanceAndClass from "../../utils/replaceInstanceAndClass";

interface IPromptListCard {
  prompt : IPrompt,
  instancePrompt : string,
  classPrompt : string
}

const PromptListCard = ({ prompt, instancePrompt, classPrompt }: IPromptListCard) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer
    bg-gradient-to-r from-gray-700 via-gray-900 to-black
    
    ">
      <img
        className="w-full"
        src={prompt.render_image}
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4">
        {/* <div className="font-bold text-xl mb-2 text-violet-300">
          
        </div> */}
        <p className="text-white text-base">{replaceInstanceAndClass(
                prompt.prompt,
                instancePrompt,
                classPrompt
              )}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        {/* <span className="cursor-pointer inline-block bg-black rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
          Guidance
        </span>
        <span className="cursor-pointer inline-block bg-black rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
          Dimensions
        </span>
        <span className="cursor-pointer inline-block bg-black rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
          Seed
        </span> */}
      </div>
    </div>
  );
};

export default PromptListCard;
