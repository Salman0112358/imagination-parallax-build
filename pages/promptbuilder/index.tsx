import { supabase } from "../../utils/supabaseClient";

import Head from "next/head";
import React, { useState } from "react";

import PromptList from "../../components/PromptList/PromptList";
import PromptInstanceAndClassInput from "../../components/PromptInstanceAndClassInput/PromptInstanceAndClassInput";
import PromptSubmission from "../../components/PromptSubmission/PromptSubmission";
import { IPrompt } from "../../typescript";
import router from "next/router";

interface IPromptBuilder {
  data: IPrompt[];
}

const PromptBuilder = ({ data }: IPromptBuilder) => {
  const [instancePrompt, setInstancePrompt] = useState("");
  const [classPrompt, setClassPrompt] = useState("");
  const [sortOrder, setSortOrder] = useState<"random" | "new">("new");
  const [sortedData, setSortedData] = useState<IPrompt[]>(data);

  const handleSortOrder = (sort: string) => {
    if (sort === "random") {
      setSortedData(data.sort(() => Math.random() - 0.5));
    } else {
      setSortedData(data);
    }
    router.replace(router.asPath, undefined, { scroll: false });
  };

  return (
    <>
      <Head>
        <title>Imagine A Prompt</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className=" absolute inset-x-0 top-20 flex flex-col justify-center items-center space-y-5">
          <PromptSubmission />

          <PromptInstanceAndClassInput
            instancePrompt={instancePrompt}
            classPrompt={classPrompt}
            setInstancePrompt={setInstancePrompt}
            setClassPrompt={setClassPrompt}
          />

          <div className="outlineBox w-[150vh]">
            <button
              className="submitPromptButton h-[3vh] text-black bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500"
              onClick={() => handleSortOrder("random")}
            >
              Random
            </button>
            <button
              className="submitPromptButton h-[3vh] text-black bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500"
              onClick={() => handleSortOrder("new")}
            >
              Newest
            </button>
          </div>
          <PromptList
            data={sortedData}
            instancePrompt={instancePrompt}
            classPrompt={classPrompt}
          />
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
