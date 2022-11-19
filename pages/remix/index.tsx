import { supabase } from "../../utils/supabaseClient";

import Head from "next/head";
import React, { useEffect, useState } from "react";

import PromptList from "../../components/PromptList/PromptList";
import PromptInstanceAndClassInput from "../../components/PromptInstanceAndClassInput/PromptInstanceAndClassInput";
import PromptSubmission from "../../components/PromptSubmission/PromptSubmission";
import { IPrompt } from "../../typescript";
import router from "next/router";
import { GenericModal } from "../../components/GenericModal/GenericModal";
import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";

interface IPromptBuilder {
  data: IPrompt[];
}

const PromptBuilder = ({ data }: IPromptBuilder) => {
  const [instancePrompt, setInstancePrompt] = useState("");
  const [classPrompt, setClassPrompt] = useState("");
  const [sortedData, setSortedData] = useState<IPrompt[]>([]);

  useEffect(() => {
    handleSortOrder("new");
  }, []);

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
          {/* <div className="flex flex-row">
            <PromptInstanceAndClassInput
              instancePrompt={instancePrompt}
              classPrompt={classPrompt}
              setInstancePrompt={setInstancePrompt}
              setClassPrompt={setClassPrompt}
            />
          </div> */}

          {/* <div className="outlineBox w-[70vw] space-x-5">
            <button onClick={() => handleSortOrder("random")}>Random</button>
            <button onClick={() => handleSortOrder("new")}>Newest</button>
          </div> */}
          <ImageCarousel data={sortedData} />
          {/* <PromptList
            data={sortedData}
            instancePrompt={instancePrompt}
            classPrompt={classPrompt}
          /> */}
        </div>
      </main>
    </>
  );
};

export default PromptBuilder;

export async function getServerSideProps() {
  const { data, error } = await supabase
    .from("remix_prompts")
    .select("*")
    .order("inserted_at", { ascending: false });
  return { props: { data } };
}
