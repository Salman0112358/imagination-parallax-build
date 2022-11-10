import React, { useEffect, useState } from "react";
import { IoMdCopy } from "react-icons/io";
import { IPrompt } from "../../typescript";
import handleCopy from "../../utils/handleCopy";
import replaceInstanceAndClass from "../../utils/replaceInstanceAndClass";
import PromptListCard from "../PromptListCard/PromptListCard";

interface IPromptList {
  instancePrompt: string;
  classPrompt: string;
  data: IPrompt[];
}

const RemixedPromptGrid = ({
  instancePrompt,
  classPrompt,
  data,
}: IPromptList) => {
  const [promptArray, setPromptArray] = useState<IPrompt[]>([]);

  useEffect(() => {
    setPromptArray(data);
  }, [data]);

  return (
    <div className="grid grid-cols-4 gap-10 place-items-center">
      {promptArray.map((prompt: IPrompt) => (
        <div className="group" key={prompt.id}>
          <PromptListCard
            prompt={prompt}
            instancePrompt={instancePrompt}
            classPrompt={classPrompt}
          />
        </div>
      ))}
    </div>
  );
};

export default RemixedPromptGrid;
