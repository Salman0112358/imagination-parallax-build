import React from "react";
import { IPrompt, IUserInstanceAndClass } from "../../typescript";
import handleCopy from "../../utils/handleCopy";
import replaceInstanceAndClass from "../../utils/replaceInstanceAndClass";
interface IPromptListCard {
  prompt: IPrompt;
  userInstanceAndClass: IUserInstanceAndClass;
}

const PromptListCard = ({ prompt, userInstanceAndClass }: IPromptListCard) => {


  return (
    <>
      <div className="relative opacity-90">
        <button
          className=" hover:bg-indigo-900 absolute rounded-md right-0  m-1 hidden group-hover:block font-light"
          onClick={() => {
            handleCopy(
              replaceInstanceAndClass(
                prompt.prompt,
                userInstanceAndClass.instancePrompt,
                userInstanceAndClass.classPrompt
              )
            );
          }}
        >
          Copy
        </button>    
        <button
          className=" text-center hover:bg-indigo-900 absolute rounded-md left-0 m-1 hidden group-hover:block font-light"
          onClick={() => {
          }}
        >
          Kudos
        </button>
      </div>
      <div className="px-1 py-1 font-light absolute bottom-0 w-full opacity-90 text-[0px]">
        <span className=" text-base inline-block bg-black rounded-md px-3 py-1 text-white">
          Posted by : {prompt.username}
        </span>
        <span className="text-base inline-block bg-black rounded-md px-3 py-1 text-white">
        Kudos ❤️ : {prompt.kudos}
        </span>
        <span className="text-base inline-block bg-black rounded-md px-3 py-1 text-white">
          Prompt : {replaceInstanceAndClass(
            prompt.prompt,
            userInstanceAndClass.instancePrompt,
            userInstanceAndClass.classPrompt
          ).slice(0, 80)}...
        </span>
        {/* <span className="inline-block bg-black rounded-full px-3 py-1 text-white">
          Dimensions : {prompt.natural_width} X {prompt.natural_height}
        </span>
        {prompt.guidance_scale && (
          <span className="inline-block bg-black rounded-full px-3 py-1 text-white">
            Guidance : {prompt.guidance_scale}
          </span>
        )} */}
      </div>
    </>
  );
};

export default PromptListCard;
