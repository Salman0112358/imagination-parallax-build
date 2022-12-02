import React from "react";
import { toast } from "react-toastify";
import {
  IPromptInstanceAndClassInput,
  IUserInstanceAndClass,
} from "../../typescript";

const PromptInstanceAndClassInput = ({
  userInstanceAndClass,
  setUserInstanceAndClass,
}: IPromptInstanceAndClassInput) => {
  const handleInstanceAndClass = (
    userInstanceAndClass: IUserInstanceAndClass,
    setUserInstanceAndClass: React.Dispatch<
      React.SetStateAction<IUserInstanceAndClass>
    >,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setUserInstanceAndClass({ ...userInstanceAndClass, [name]: value });
  };
  return (
    <div className=" flex flex-col space-y-4 justify-center items-center  w-[50vw] h-screen">
      {/* Inputs here */}
      <input
        name="instancePrompt"
        className="promptInput h-[5vh]"
        placeholder="Instance Prompt "
        onChange={(e) =>
          handleInstanceAndClass(
            userInstanceAndClass,
            setUserInstanceAndClass,
            e
          )
        }
      />
      <input
        name="classPrompt"
        className="promptInput h-[5vh]"
        placeholder="Class Prompt"
        onChange={(e) =>
          handleInstanceAndClass(
            userInstanceAndClass,
            setUserInstanceAndClass,
            e
          )
        }
      />
      {/* Buttons Here */}

      <button
        className="w-full"
        onClick={() => {
          localStorage.setItem("instance", userInstanceAndClass.instancePrompt);
          localStorage.setItem("class", userInstanceAndClass.classPrompt);
          toast.success("Instance & Class Settings Applied!");
          window.alert("Instance & Class Settings Applied!")
        }}
      >
        Apply
      </button>
      <button
        className="w-full"
        onClick={() => {
          setUserInstanceAndClass({ instancePrompt: "", classPrompt: "" });
          localStorage.setItem("instance", "{INSTANCE_PROMPT}");
          localStorage.setItem("class", "{CLASS_PROMPT}");
          toast.info("Instance & Class Settings Reset!");
          window.alert("Instance & Class Settings Reset!");
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default PromptInstanceAndClassInput;
