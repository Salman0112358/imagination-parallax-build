import React from "react";
import { IPromptInstanceAndClassInput, IUserInstanceAndClass } from "../../typescript";

const PromptInstanceAndClassInput = ({ userInstanceAndClass, setUserInstanceAndClass }: IPromptInstanceAndClassInput) => {

  const handleInstanceAndClass = (
    userInstanceAndClass: IUserInstanceAndClass,
    setUserInstanceAndClass: React.Dispatch<React.SetStateAction<IUserInstanceAndClass>>,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setUserInstanceAndClass({ ...userInstanceAndClass, [name]: value });
  };
  return (
    <div className="outlineBox w-[50vw] p-1">
      <div className="flex items-center space-x-5">
        <input
          name="instancePrompt"
          className="promptInput h-[5vh]"
          placeholder="Instance Prompt "
          onChange={(e) => handleInstanceAndClass(userInstanceAndClass, setUserInstanceAndClass, e)}
        />
        <input
          name="classPrompt"
          className="promptInput h-[5vh]"
          placeholder="Class Prompt"
          onChange={(e) => handleInstanceAndClass(userInstanceAndClass, setUserInstanceAndClass, e)}
        />
        <button className="" onClick={() => {
          setUserInstanceAndClass({ instancePrompt: "", classPrompt: "" });
          localStorage.setItem("instance", "{INSTANCE_PROMPT}");
          localStorage.setItem("class", "{CLASS_PROMPT}");

        }}>
          Reset
        </button>
        <button className="" onClick={() => {
          localStorage.setItem("instance", userInstanceAndClass.instancePrompt)
          localStorage.setItem("class", userInstanceAndClass.classPrompt)
        }}>
          Apply
        </button>
      </div>
    </div>
  );
};

export default PromptInstanceAndClassInput;
