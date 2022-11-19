import React from "react";

interface IPromptInstanceAndClassInput {
  instancePrompt: string;
  classPrompt: string;
  setInstancePrompt: React.Dispatch<React.SetStateAction<string>>;
  setClassPrompt: React.Dispatch<React.SetStateAction<string>>;
}

const PromptInstanceAndClassInput = ({
  instancePrompt,
  setInstancePrompt,
  classPrompt,
  setClassPrompt,
}: IPromptInstanceAndClassInput) => {
  const handleClear = () => {
    setInstancePrompt("");
    setClassPrompt("");
  };

  return (
    <div className="outlineBox w-[50vw] p-1">
      <div className="flex items-center space-x-5">
        <input
          className="promptInput h-[5vh]"
          placeholder="Instance Prompt "
          value={instancePrompt}
          onChange={(event) => setInstancePrompt(event.target.value)}
        />
        <input
          className="promptInput h-[5vh]"
          placeholder="Class Prompt"
          value={classPrompt}
          onChange={(event) => setClassPrompt(event.target.value)}
        />
        <button className="" onClick={handleClear}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default PromptInstanceAndClassInput;
