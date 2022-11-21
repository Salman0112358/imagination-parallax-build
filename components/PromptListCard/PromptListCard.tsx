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
      <div className=" absolute bottom-0 w-full overflow-hidden  opacity-70">
        {/* <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-violet-300"> <p className="text-white font-light text-sm">
            {replaceInstanceAndClass(
              prompt.prompt,
              instancePrompt,
              classPrompt
            )}
          </p></div>
         
        </div> */}
        <div className="px-4 py-4 font-light">
          <span className="cursor-pointer inline-block bg-black rounded-full px-3 py-1 text-sm  text-white mr-2 mb-2">
            Posted by : {prompt.username}
          </span>
          <span className="cursor-pointer inline-block bg-black rounded-full px-3 py-1 text-sm  text-white mr-2 mb-2">
            Dimensions : {prompt.natural_width} X {prompt.natural_height}
          </span>
          {prompt.guidance_scale && (
            <span className="cursor-pointer inline-block bg-black rounded-full px-3 py-1 text-sm  text-white mr-2 mb-2">
              Guidance : {prompt.guidance_scale}
            </span>
          )}

          {/* <span className="cursor-pointer inline-block bg-black rounded-full px-3 py-1 text-sm  text-white mr-2 mb-2">
            Sampling Method : {prompt.sampling_method}
          </span>
          <span className="cursor-pointer inline-block bg-black rounded-full px-3 py-1 text-sm  text-white mr-2 mb-2">
            Seed : {prompt.seed}
          </span> */}
        </div>
      </div>
    </>
  );
};

export default PromptListCard;
