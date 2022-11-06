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

const PromptList = ({ instancePrompt, classPrompt, data }: IPromptList) => {
  const [promptArray, setPromptArray] = useState<IPrompt[]>([]);

  console.log(data)


  useEffect(() => {
    setPromptArray(data.sort(() => Math.random() - 0.5));
  }, [data]);

  return (
    <div className="grid grid-cols-4 gap-10 place-items-center">
      {promptArray.map((prompt: IPrompt) => (
        <PromptListCard prompt={prompt} instancePrompt={instancePrompt} classPrompt={classPrompt} key={prompt.id} />
      ))}
    </div>
  );
};

export default PromptList;
