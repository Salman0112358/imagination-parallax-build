import { supabase } from "../../utils/supabaseClient";

import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import PromptSubmission from "../../components/PromptSubmission/PromptSubmission";
import { IPrompt } from "../../typescript";
import router from "next/router";
import { GenericModal } from "../../components/GenericModal/GenericModal";
import extractUserRemixSubmissions from "../../utils/extractUserRemixSubmissions";
import RemixImageGrid from "../../components/RemixImageGrid/RemixImageGrid";
import PromptListCard from "../../components/PromptListCard/PromptListCard";
import PromptInstanceAndClassInput from "../../components/PromptInstanceAndClassInput/PromptInstanceAndClassInput";


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

  console.log(userSubmissions);

  return (
    <>
      <Head>
        <title>Imagine A Prompt</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mt-[8vh]">
        <div className=" fixed left-0 top-[30%] m-2 z-[50] max-[720px]:hidden outlineBox  space-y-1 flex flex-col justify-center ">
          <button title="Sort By Random" onClick={() => handleSortOrder("random")}>🎲</button>
          <button title="Sort By Latest" onClick={() => handleSortOrder("new")}>🔥</button>
          <button title="Show Only Your Submissions" onClick={() => setSortedData(userSubmissions)}>👤</button>
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
        </div>

        <div className="w-full h-screen ">
          <div className=" px-[20px] overflow-y-auto ">
            <RemixImageGrid>
              {sortedData.map((image: IPrompt) => (
                <>
                  <div className="relative hover:scale-90 cursor-pointer group hover:z-40">
                    <div className="h-full w-full z-40 absolute  hidden group-hover:block ">
                      <PromptListCard
                        prompt={image}
                        instancePrompt={instancePrompt}
                        classPrompt={classPrompt}
                      />
                    </div>

                    <img
                      className="group p-1  transition ease-in-out  !rounded-3xl"
                      key={image.id}
                      src={image.render_image}
                      style={{ width: "100%", display: "block" }}
                    />
                  </div>
                </>
              ))}
            </RemixImageGrid>
          </div>
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

{
  /* <div className=" float-left w-1/2 h-[90vh] ">
          <ImageCarousel data={userSubmissions} />
        </div> */
}

/* <div className=" absolute inset-x-0 top-20 flex flex-col justify-center items-center space-y-5"> */

{
  /* <div className="flex flex-row">
            <PromptInstanceAndClassInput
              instancePrompt={instancePrompt}
              classPrompt={classPrompt}
              setInstancePrompt={setInstancePrompt}
              setClassPrompt={setClassPrompt}
            />
          </div> */
}
{
  /* </div> */
}
