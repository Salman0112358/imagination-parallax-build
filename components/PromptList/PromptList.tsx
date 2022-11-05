import React, { useState } from "react";
import { IoMdCopy } from "react-icons/io";
import { IPrompt } from "../../typescript";
import handleCopy from "../../utils/handleCopy";
import replaceInstanceAndClass from "../../utils/replaceInstanceAndClass";

interface IPromptList {
  promptArray: IPrompt[];
  instancePrompt: string;
  classPrompt: string;
}

const PromptList = ({
  instancePrompt,
  classPrompt,
  promptArray,
}: IPromptList) => {
  return (
    <div className=" promptListWrapper justify-center text-slate-500">
      <ul className="space-y-5">
        {promptArray.map((prompt: IPrompt) => (
          <div
            className=" w-[150vh] outlineBox cursor-pointer border-2 border-violet-300 hover:border-violet-900  flex flex-row"
            key={prompt.id}
          >
            <div className=" w-4/5 h-10 text-base text-violet-300">
              {replaceInstanceAndClass(
                prompt.prompt,
                instancePrompt,
                classPrompt
              )}
            </div>
            <div className=" relative w-1/5">
              <IoMdCopy
                fill="white"
                className="absolute text-slate-500  inset-y-0 right-0 cursor-pointer"
                onClick={() =>
                  handleCopy(
                    replaceInstanceAndClass(
                      prompt.prompt,
                      instancePrompt,
                      classPrompt
                    )
                  )
                }
              />
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default PromptList;
