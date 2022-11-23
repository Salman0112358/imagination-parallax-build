import React from "react";
import { IPrompt } from "../../typescript";
import handleCopy from "../../utils/handleCopy";
import replaceInstanceAndClass from "../../utils/replaceInstanceAndClass";
import { toast } from "react-toastify";
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
  const notify = (message: string) => toast.success(message, {autoClose : 500, hideProgressBar : true});
  return (
    <>
      <div className="relative opacity-70">
        <button
          className=" hover:bg-indigo-900 absolute rounded-3xl right-0 w-1/4 m-1 hidden group-hover:block font-light"
          onClick={() => {
            handleCopy(
              replaceInstanceAndClass(
                prompt.prompt,
                instancePrompt,
                classPrompt
              )
            );
            notify("Copied To 📋");
          }}
        >
          Copy
        </button>
        <button 
        className=" text-center hover:bg-indigo-900 absolute rounded-3xl left-0 w-1/4 m-1 hidden group-hover:block font-light"
        onClick={() => {
          notify("🎉Kudos Sent🎉")
        }}
        >
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
