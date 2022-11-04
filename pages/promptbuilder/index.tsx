import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Compressor from "compressorjs";
import { supabase } from "../../utils/supabaseClient";
import { IoMdCopy } from "react-icons/io";
import { ImCross } from "react-icons/im";
import { useRouter } from "next/router";
import LoadingImage from "../../assets/images/Loading-Preview.gif";
import Image from "next/image";

import Head from "next/head";
import React, { useEffect, useState } from "react";
import { IPrompt } from "../../typescript";
import handleCopy from "../../utils/handleCopy";
import replaceInstanceAndClass from "../../utils/replaceInstanceAndClass";

const PromptBuilder = ({ data }: any) => {
  const [instancePrompt, setInstancePrompt] = useState("");
  const [classPrompt, setClassPrompt] = useState("");
  const [promptArray, setPromptArray] = useState<IPrompt[]>([]);
  const [promptIdea, setPromptIdea] = useState("");
  const [previewImageUrl, setPreviewImageUrl] = useState<string>("");
  const [uploadFile, setUploadFile] = useState<File | null>();

  useEffect(() => {
    setPromptArray(data);
  }, [data]);

  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  const handleClear = () => {
    setInstancePrompt("");
    setClassPrompt("");
  };

  const handleRemoveImagePreview = () => {
    setPreviewImageUrl("");
  };

  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (user && e.target.files) {
      const chosenFile: File = e.target.files[0];

      if (chosenFile) {
        setPreviewImageUrl(URL.createObjectURL(chosenFile));
        setUploadFile(chosenFile);
      } else {
        setPreviewImageUrl(previewImageUrl);
      }
    }
  };

  const handleImageFileUpload = async (inputFile: File) => {
    if (user && inputFile) {
      new Compressor(inputFile, {
        convertSize: 200,
        convertTypes: "image/png,image/webp",
        quality: 0.8,

        // The compression process is asynchronous,
        // which means you have to access the `result` in the `success` hook function.
        async success(result) {
          const formData = new FormData();

          // The third parameter is required for server
          formData.append("file", result, "imageman");

          const { data, error } = await supabase.storage
            .from("user-images")
            .upload(
              `images/${user.id}/` + inputFile.name + "-" + new Date(),
              formData,
              {
                cacheControl: "3600",
                upsert: false,
              }
            );

          console.log("Compression success");
          setPreviewImageUrl("");
          setUploadFile(null);
        },
        error(err) {
          console.log(err.message);
        },
      });
    }
  };

  const refreshPromptList = () => {
    router.replace(router.asPath);
  };

  const handlePromptSubmission = async () => {
    if (!promptIdea) {
      window.alert("You Must Have A Prompt With A Preview Image To Submit!");
    } else {
      const { data, error } = await supabaseClient.from("prompts").insert([
        {
          prompt: promptIdea,
          render_image: "",
          user_id: user?.id,
        },
      ]);

      setPromptIdea("");

      if (uploadFile) {
        await handleImageFileUpload(uploadFile);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Imagine A Prompt</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className=" absolute inset-x-0 top-20 flex flex-col justify-center items-center space-y-5">
          <div className="flex flex-row space-x-10">
            <div className="outlineBox">
              <div className="flex flex-col">
                <div className="flex flex-row">
                  <textarea
                    className="promptTextArea w-[70vh]"
                    name="prompt"
                    maxLength={168}
                    placeholder="Enter your prompt ideas here"
                    rows={6}
                    value={promptIdea}
                    onChange={(event) => setPromptIdea(event.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-row mt-2 justify-center">
                <input
                  type="file"
                  name="render"
                  id="upload-render"
                  accept="image/png, image/jpeg"
                  className="hidden"
                  onChange={handleImagePreview}
                />

                <button className="submitPromptButton py-2">
                  Artist Ideas
                </button>
                <button className="submitPromptButton py-2">Composition</button>
                <button
                  className="submitPromptButton"
                  onClick={() =>
                    document.getElementById("upload-render")?.click()
                  }
                >
                  Preview Render
                </button>
                {!previewImageUrl && (
                  <button
                    className="submitPromptButton"
                    onClick={async () => {
                      await handlePromptSubmission();
                      refreshPromptList();
                    }}
                  >
                    Submit Prompt
                  </button>
                )}
              </div>
            </div>
            <div className="relative outlineBox text-violet-300">
              {previewImageUrl && (
                <ImCross
                  className="absolute right-10 cursor-pointer top-[3vh]"
                  onClick={handleRemoveImagePreview}
                />
              )}
              {previewImageUrl && (
                <button
                  className="absolute submitPromptButton bg-violet-900 text-slate-100 bottom-0 inset-x-0"
                  onClick={handlePromptSubmission}
                >
                  Submit Prompt
                </button>
              )}

              <Image
                src={previewImageUrl ? previewImageUrl : LoadingImage}
                alt="render preview"
                width={512}
                height={512}
                className="rounded-lg"
              />
            </div>
          </div>

          <div className="outlineBox">
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
              <button className="submitPromptButton" onClick={handleClear}>
                Clear
              </button>
            </div>
          </div>

          <div className="promptListWrapper text-slate-500">
            <ul className="space-y-5">
              {promptArray.map((prompt: IPrompt) => (
                <div
                  className="outlineBox cursor-pointer border-2 border-violet-300 hover:border-violet-900  flex flex-row"
                  key={prompt.id}
                >
                  <div className=" w-4/5 h-10 text-base text-violet-300">
                    {replaceInstanceAndClass(
                      prompt.prompt,
                      instancePrompt,
                      classPrompt
                    )}
                  </div>
                  <div className=" relative w-1/5">
                    <IoMdCopy
                      fill="white"
                      className="absolute text-slate-500  inset-y-0 right-0 cursor-pointer"
                      onClick={() =>
                        handleCopy(
                          replaceInstanceAndClass(
                            prompt.prompt,
                            instancePrompt,
                            classPrompt
                          )
                        )
                      }
                    />
                  </div>
                </div>
              ))}
            </ul>
          </div>
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
