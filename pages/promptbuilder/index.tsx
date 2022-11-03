import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { supabase } from "../../utils/supabaseClient";
import { IoMdCopy } from "react-icons/io";
import { useRouter } from "next/router";

import Head from "next/head";
import React, { useEffect, useState } from "react";
import { IPrompt } from "../../typescript";
import handleCopy from "../../utils/handleCopy";
import replaceInstanceAndClass from "../../utils/replaceInstanceAndClass";

const people = [
  { id: 1, name: "Durward Reynolds", unavailable: false },
  { id: 2, name: "Kenton Towne", unavailable: false },
  { id: 3, name: "Therese Wunsch", unavailable: false },
  { id: 4, name: "Benedict Kessler", unavailable: true },
  { id: 5, name: "Katelyn Rohan", unavailable: false },
];

const PromptBuilder = ({ data }: any) => {
  const [instancePrompt, setInstancePrompt] = useState("");
  const [classPrompt, setClassPrompt] = useState("");
  const [promptArray, setPromptArray] = useState<IPrompt[]>([]);
  const [promptIdea, setPromptIdea] = useState("");

  useEffect(() => {
    setPromptArray(data);
  }, [data]);

  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  const handleClear = () => {
    setInstancePrompt("");
    setClassPrompt("");
  };

  const refreshPromptList = () => {
    router.replace(router.asPath);
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
            <div className="flex flex-col">
              <div className="flex flex-row">
                <textarea
                  className="promptTextArea w-[100vh]"
                  name="prompt"
                  maxLength={168}
                  placeholder="Enter your prompt ideas here"
                  rows={6}
                  value={promptIdea}
                  onChange={(event) => setPromptIdea(event.target.value)}
                />
                <button
                  className="submitPromptButton"
                  onClick={() =>
                    document.getElementById("upload-render")?.click()
                  }
                >
                  Upload Render
                </button>
                <input
                  type="file"
                  name="render"
                  id="upload-render"
                  accept="image/png, image/jpeg"
                  className="hidden"
                />

                <button
                  className="submitPromptButton"
                  onClick={async () => {
                    await handlePromptSubmission();
                    refreshPromptList();
                  }}
                >
                  Submit Prompt
                </button>
              </div>
              <div className="flex flex-row">
                <button className="submitPromptButton py-2">
                  Artist Ideas
                </button>
                <button className="submitPromptButton py-2">Composition</button>
              </div>
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
                  className="outlineBox cursor-pointer border-2 border-violet-300 hover:border-violet-900  flex flex-row"
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
        </div>
      </main>
    </>
  );
};

export default PromptBuilder;

export async function getServerSideProps() {
  const { data, error } = await supabase
    .from("prompts")
    .select("*")
    .order("inserted_at", { ascending: false });
  return { props: { data } };
}
