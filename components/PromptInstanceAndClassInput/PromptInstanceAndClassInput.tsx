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
} : IPromptInstanceAndClassInput) => {
  const handleClear = () => {
    setInstancePrompt("");
    setClassPrompt("");
  };

  return (
    <div className="outlineBox w-[150vh]">
      <div className="flex flex-row">
        <input
          className="promptInput"
          placeholder="Instance Prompt"
          value={instancePrompt}
          onChange={(event) => setInstancePrompt(event.target.value)}
        />
        <input
          className="promptInput"
          placeholder="Class Prompt"
          value={classPrompt}
          onChange={(event) => setClassPrompt(event.target.value)}
        />
        <button className="submitPromptButton" onClick={handleClear}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default PromptInstanceAndClassInput;
