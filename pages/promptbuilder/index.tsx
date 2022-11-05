import { supabase } from "../../utils/supabaseClient";

import Head from "next/head";
import React, { useEffect, useState } from "react";

import PromptList from "../../components/PromptList/PromptList";
import PromptInstanceAndClassInput from "../../components/PromptInstanceAndClassInput/PromptInstanceAndClassInput";
import PromptSubmission from "../../components/PromptSubmission/PromptSubmission";
import getPromptImageUrls from "../../utils/getPromptImage";

const PromptBuilder = ({ data }: any) => {
  const [instancePrompt, setInstancePrompt] = useState("");
  const [classPrompt, setClassPrompt] = useState("");


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

          <PromptList
            data={data}
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
