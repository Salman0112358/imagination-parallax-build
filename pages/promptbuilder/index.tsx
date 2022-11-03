import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { supabase } from "../../utils/supabaseClient";
import { IoMdCopy } from "react-icons/io";

import Head from "next/head";
import React, { useEffect, useState } from "react";
import { IPrompt } from "../../typescript";
import handleCopy from "../../utils/handleCopy";
import replaceInstanceAndClass from "../../utils/replaceInstanceAndClass";

const PromptBuilder = ({ data }: any) => {
  const [instancePrompt, setInstancePrompt] = useState("");
  const [classPrompt, setClassPrompt] = useState("");
  const [promptArray, setPromptArray] = useState<IPrompt[]>([]);
  const [promptIdea, setPromptIdea] = useState("");

  useEffect(() => {
    setPromptArray(data);
  }, [data]);

  const supabaseClient = useSupabaseClient();
  const user = useUser();

  const handleClear = () => {
    setInstancePrompt("");
    setClassPrompt("");
  };

  const handlePromptSubmission = async () => {
    const { data, error } = await supabaseClient.from("prompts").insert([
      {
        prompt: promptIdea,
        render_image: "",
        user_id: user?.id,
      },
    ]);

    setPromptIdea("");
    console.log("Prompt Submitted");
  };

  return (
    <>
      <Head>
        <title>Imagine A Prompt</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        
          <div className=" absolute inset-x-0 top-20 flex flex-col justify-center items-center space-y-5">
            <div className="outlineBox">
              <div className="flex flex-row">
                <textarea
                  className="promptTextArea w-[100vh]"
                  name="prompt"
                  placeholder="Enter your prompt ideas here"
                  rows={6}
                  value={promptIdea}
                  onChange={(event) => setPromptIdea(event.target.value)}
                />
                <button className="submitPromptButton">Upload Render</button>
                <button
                  className="submitPromptButton"
                  onClick={handlePromptSubmission}
                >
                  Submit Prompt
                </button>
              </div>
            </div>

            <div className="outlineBox">
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

            <div className="promptListWrapper text-slate-500">
              <ul className="space-y-5">
                {promptArray.map((prompt: IPrompt) => (
                  <div
                    className="outlineBox  flex flex-row"
                    key={prompt.id}
                  >
                    <div className=" w-4/5">{replaceInstanceAndClass(prompt.prompt , instancePrompt, classPrompt)}</div>
                    <div className=" relative w-1/5">
                      <IoMdCopy
                        fill="white"
                        className="absolute text-slate-500  inset-y-0 right-0 cursor-pointer"
                        onClick={() => handleCopy(prompt.prompt) }
                      />
                    </div>
                  </div>
                ))}
              </ul>
            </div>
          </div>
      </main>
    </>
  );
};

export default PromptBuilder;

export async function getServerSideProps() {
  const { data, error } = await supabase.from("prompts").select("*");
  return { props: { data } };
}
