import { supabase } from "../../utils/supabaseClient";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { IPrompt, IUserInstanceAndClass } from "../../typescript";
import PromptListCard from "../../components/PromptListCard/PromptListCard";
import ImageGrid from "../../components/ImageGrid/ImageGrid";
import RemixToolBar from "../../components/RemixToolBar/RemixToolBar";

const remixPage = ({ data }: { data: IPrompt[] }) => {
  const [userInstanceAndClass, setUserInstanceAndClass] =
    useState<IUserInstanceAndClass>({ instancePrompt: "", classPrompt: "" });
  const [sortedData, setSortedData] = useState<IPrompt[]>(data);

  useEffect(() => {
    console.log(localStorage.getItem("class"));
    console.log(localStorage.getItem("instance"));
    setUserInstanceAndClass({
      instancePrompt: localStorage.getItem("instance") as string,
      classPrompt: localStorage.getItem("class") as string,
    });
  }, []);

  console.log(userInstanceAndClass);

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
            data={data}
            userInstanceAndClass={userInstanceAndClass}
            setUserInstanceAndClass={setUserInstanceAndClass}
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
                  userInstanceAndClass={userInstanceAndClass}
                />
              </div>
            </div>
          ))}
        </ImageGrid>
      </main>
    </>
  );
};

export default remixPage;

export async function getServerSideProps() {
  const { data, error } = await supabase
    .from("remix_prompts")
    .select("*")
    .order("inserted_at", { ascending: false });
  return { props: { data } };
}
