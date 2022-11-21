import { supabase } from "../../utils/supabaseClient";

import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import PromptSubmission from "../../components/PromptSubmission/PromptSubmission";
import { IPrompt } from "../../typescript";
import router from "next/router";
import { GenericModal } from "../../components/GenericModal/GenericModal";
import extractUserRemixSubmissions from "../../utils/extractUserRemixSubmissions";
import PromptListCard from "../../components/PromptListCard/PromptListCard";
import PromptInstanceAndClassInput from "../../components/PromptInstanceAndClassInput/PromptInstanceAndClassInput";
import ImageGrid from "../../components/ImageGrid/ImageGrid";

interface IPromptBuilder {
  data: IPrompt[];
}

const PromptBuilder = ({ data }: IPromptBuilder) => {
  const [instancePrompt, setInstancePrompt] = useState("");
  const [classPrompt, setClassPrompt] = useState("");
  const [sortedData, setSortedData] = useState<IPrompt[]>([]);
  const [userSubmissions, setUserSubmissions] = useState<IPrompt[]>([]);

  const user = useUser();

  useEffect(() => {
    handleSortOrder("new");
    user && setUserSubmissions(extractUserRemixSubmissions(data, user?.id));
  }, [user]);

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

      <main className="mt-[8vh]">
        <div className=" fixed left-0 top-[30%] m-2 z-[50] max-[720px]:hidden outlineBox  space-y-1 flex flex-col justify-center ">
          <button
            title="Sort By Random"
            onClick={() => handleSortOrder("random")}
          >
            🎲
          </button>
          <button title="Sort By Latest" onClick={() => handleSortOrder("new")}>
            🔥
          </button>
          <button
            title="Show Only Your Submissions"
            onClick={() => setSortedData(userSubmissions)}
          >
            👤
          </button>

          <GenericModal modalText="💡">
            <PromptSubmission />
          </GenericModal>
          <GenericModal modalText="🖊️">
            <div className="flex flex-row">
              <PromptInstanceAndClassInput
                instancePrompt={instancePrompt}
                classPrompt={classPrompt}
                setInstancePrompt={setInstancePrompt}
                setClassPrompt={setClassPrompt}
              />
            </div>
          </GenericModal>
          <button
            title="Clear The Instance And Class"
            onClick={() => {
              setClassPrompt("");
              setInstancePrompt("");
            }}
          >
            🧻
          </button>
        </div>
          <div className=" px-[1vw] ">
            <ImageGrid>
              {data.map((image: IPrompt) => (
                <div
                  className={` group card ${image.natural_height / image.natural_width > 1 && "card-tall"
                    } ${image.natural_height / image.natural_width < 1 && "card-wide"}   `}
                  key={image.id}
                  style={{ backgroundImage: `url('${image.render_image}')` }}
                >
                  <div className=" w-full h-full  absolute bottom-0  hidden group-hover:block ">
                    <PromptListCard
                      prompt={image}
                      instancePrompt={instancePrompt}
                      classPrompt={classPrompt}
                    />
                  </div>
                </div>
              ))}
            </ImageGrid>
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
