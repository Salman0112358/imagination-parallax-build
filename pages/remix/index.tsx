import { supabase } from "../../utils/supabaseClient";
import Head from "next/head";
import React, { useState } from "react";
import { IPrompt } from "../../typescript";
import PromptListCard from "../../components/PromptListCard/PromptListCard";
import ImageGrid from "../../components/ImageGrid/ImageGrid";
import RemixToolBar from "../../components/RemixToolBar/RemixToolBar";

interface IPromptBuilder {
  data: IPrompt[];
}

const PromptBuilder = ({ data }: IPromptBuilder) => {
  const [instancePrompt, setInstancePrompt] = useState("");
  const [classPrompt, setClassPrompt] = useState("");
  const [sortedData, setSortedData] = useState<IPrompt[]>(data);

  return (
    <>
      <Head>
        <title>Imagine A Prompt</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mt-[8vh]">
        <div className="sticky top-[8vh] z-50">
          <RemixToolBar
            sortedData={sortedData}
            setSortedData={setSortedData}
            instancePrompt={instancePrompt}
            classPrompt={classPrompt}
            setInstancePrompt={setInstancePrompt}
            setClassPrompt={setClassPrompt}
            data={data}
          />
        </div>
        <ImageGrid>
          {sortedData.map((image: IPrompt) => (
            <div
              className={` group card ${
                image.natural_height / image.natural_width > 1 && "card-tall"
              } ${
                image.natural_height / image.natural_width < 1 && "card-wide"
              }   `}
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
