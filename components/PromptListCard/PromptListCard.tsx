import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { IPrompt, IUserInstanceAndClass } from "../../typescript";
import handleCopy from "../../utils/handleCopy";
import replaceInstanceAndClass from "../../utils/replaceInstanceAndClass";
interface IPromptListCard {
  prompt: IPrompt;
  userInstanceAndClass: IUserInstanceAndClass;
  render: boolean;
  setRender: React.Dispatch<React.SetStateAction<boolean>>
}

const PromptListCard = ({ prompt, userInstanceAndClass, render, setRender }: IPromptListCard) => {
  const notify = (message: string) => toast.success(message);


  const supabase = useSupabaseClient();
  const user = useUser();

  const handleKudos = async (prompt: IPrompt) => {
    console.log(prompt.id, prompt.username);
    console.log("Attempting to give kudos!");

    if (!user) return toast.error("You Must Be Logged In");

    try {
      const { error } = await supabase
        .from("kudos")
        .insert({ user_id: user?.id, remix_prompt_id: prompt.id });

      if (!error) {
        const response = (
          await supabase
            .from("remix_prompts")
            .select("kudos")
            .eq("id", prompt.id)
        ).data;

        if (response) {
          console.log(response[0].kudos);
          const { error } = await supabase
            .from("remix_prompts")
            .update({ kudos: response[0].kudos + 1 })
            .eq("id", prompt.id);
          console.log("like has been registered");
          toast.success("🎉Kudos!🎉");
        }

        console.log("added to your kudos list");
      } else {
        console.log("You have already given this post a kudos!");
        toast.info("You Have Already Given Kudos");
      }
    } catch (error) {
      console.error(error);
    }
  };

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
            notify("Copied");
          }}
        >
          Copy
        </button>
        <button
          className=" text-center hover:bg-indigo-900 absolute rounded-md left-0 m-1 hidden group-hover:block font-light"
          onClick={async () => {
            await handleKudos(prompt);
            setRender((prev) => !prev);
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
          Prompt :{" "}
          {replaceInstanceAndClass(
            prompt.prompt,
            userInstanceAndClass.instancePrompt,
            userInstanceAndClass.classPrompt
          ).slice(0, 80)}
          ...
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
