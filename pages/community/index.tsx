import { supabase } from "../../utils/supabaseClient";

import Head from "next/head";
import React, { useEffect, useState } from "react";
import { IPrompt } from "../../typescript";
import router from "next/router";
import ImageRingSlider from "../../components/ImageRingSlider/ImageRingSlider";

interface IPromptBuilder {
  data: IPrompt[];
}

const Community = async ({ data }: IPromptBuilder) => {
  
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
        <title>Community</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mt-[8vh]">
        <h1>hello everyone</h1>
        <ImageRingSlider />
      </main>
    </>
  );
};

export default Community;

export async function getServerSideProps() {
  try {
    const { data, error } = await supabase
      .from("remix_prompts")
      .select("*")
      .order("inserted_at", { ascending: false });
    return { props: { data } };
  } catch (error) {
    console.error(error);
  }
}
