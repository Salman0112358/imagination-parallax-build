import { supabase } from "../../utils/supabaseClient";

import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import PromptList from "../../components/PromptList/PromptList";
import PromptInstanceAndClassInput from "../../components/PromptInstanceAndClassInput/PromptInstanceAndClassInput";
import PromptSubmission from "../../components/PromptSubmission/PromptSubmission";
import { IPrompt } from "../../typescript";
import router from "next/router";
import { GenericModal } from "../../components/GenericModal/GenericModal";
import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";
import extractUserRemixSubmissions from "../../utils/extractUserRemixSubmissions";
import ImageGrid from "../../components/ImageGrid/ImageGrid";
import RemixImageGrid from "../../components/RemixImageGrid/RemixImageGrid";

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

      <main className="mt-[10vh]">

        <div className=" max-[720px]:hidden outlineBox w-1/2  mx-[25vw] space-x-2 p-2 my-2 flex justify-center ">
          <button onClick={() => handleSortOrder("random")}>Random</button>
          <button onClick={() => handleSortOrder("new")}>Newest</button>
          <GenericModal modalText="Remix Prompt ">
            <PromptSubmission />
          </GenericModal>
        </div>

        <div className="w-full h-[90vh] ">
          <div className=" px-[20px] h-[90vh] overflow-y-auto ">
            <RemixImageGrid >
              {sortedData.map((image) => (
                <>
                  <img className=" p-1 hover:scale-110 hover:translate-y-1 transition ease-in-out  !rounded-3xl" key={image.id} src={image.render_image} style={{ width: "100%", display: "block" }} />
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









{/* <div className=" float-left w-1/2 h-[90vh] ">
          <ImageCarousel data={userSubmissions} />
        </div> */}


{/* <div className=" absolute inset-x-0 top-20 flex flex-col justify-center items-center space-y-5"> */ }
{/* <div className="flex flex-row">
            <PromptInstanceAndClassInput
              instancePrompt={instancePrompt}
              classPrompt={classPrompt}
              setInstancePrompt={setInstancePrompt}
              setClassPrompt={setClassPrompt}
            />
          </div> */}
{/* <PromptList
            data={sortedData}
            instancePrompt={instancePrompt}
            classPrompt={classPrompt}
          /> */}
{/* </div> */ }