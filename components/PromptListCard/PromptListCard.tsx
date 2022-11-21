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
          className="absolute rounded-3xl right-0 w-1/4 m-1 hidden group-hover:block font-light"
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
        <button className="absolute rounded-3xl left-0 w-1/4 m-1 hidden group-hover:block font-light">
          Kudos
        </button>
      </div>
      <div className="absolute bottom-0 w-full opacity-70 text-[0px]">
        <div className="px-4 py-1 font-light">
          <span className="inline-block bg-black rounded-full px-3 py-1 text-sm  text-white">
            Posted by : {prompt.username}
          </span>
          <span className="inline-block bg-black rounded-full px-3 py-1 text-sm  text-white">
            Dimensions : {prompt.natural_width} X {prompt.natural_height}
          </span>
          {prompt.guidance_scale && (
            <span className="inline-block bg-black rounded-full px-3 py-1 text-sm  text-white">
              Guidance : {prompt.guidance_scale}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default PromptListCard;
