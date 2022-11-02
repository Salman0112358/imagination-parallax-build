import { useUser } from "@supabase/auth-helpers-react";
import Head from "next/head";
import React, { useState } from "react";

const PromptBuilder = () => {

  const [instancePrompt, setInstancePrompt] = useState("");
  const [classPrompt, setClassPrompt] = useState("");

  const user = useUser();



  return (
    <>
      <Head>
        <title>Imagine A Prompt</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {user && (
          <div className=" absolute inset-x-0 top-20 flex flex-col justify-center items-center space-y-5">
            <h1 className="text-slate-500 font-semibold text-2xl">Insert your instance and class into the list of prompts</h1>
            <div className="rounded-md bg-black bg-opacity-20 px-8 py-6 text-sm font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
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
                <button className="submitPromptButton">Upload Render</button>
                <button className="submitPromptButton">Submit Prompt</button>
              </div>
            </div>
            <div className="promptListWrapper text-slate-500">
              <ul>
                <li>prompt 1</li>
                <li>prompt 1</li>
                <li>prompt 1</li>
                <li>prompt 1</li>
              </ul>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default PromptBuilder;
