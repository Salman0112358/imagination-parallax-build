import React, { useState } from "react";
import Image from "next/image";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { ImCross } from "react-icons/im";
import LoadingImage from "../../assets/images/Loading-Preview.gif";
import findImageWidthAndHeight from "../../utils/findImageWidth&Height";
import { IPromptDetails } from "../../typescript";
import submitRemixPrompt from "../../utils/submitRemixPrompt";

const initialPromptDetails = {
  prompt: "",
  guidance_scale: 0,
  sampling_method: "",
  seed: 0,
};

const PromptSubmission = () => {
  const [previewImageUrl, setPreviewImageUrl] = useState<string>("");
  const [uploadFile, setUploadFile] = useState<File | null>();
  const [dimensions, setDimensions] = useState<number[]>([]);
  const [promptDetails, setPromptDetails] =
    useState<IPromptDetails>(initialPromptDetails);

  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const handlePromptDetails = (
    promptDetails: IPromptDetails,
    setPromptDetails: React.Dispatch<React.SetStateAction<IPromptDetails>>,
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setPromptDetails({ ...promptDetails, [name]: value });
  };

  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (user && e.target.files) {
      const chosenFile: File = e.target.files[0];

      findImageWidthAndHeight(chosenFile, setDimensions);

      if (chosenFile) {
        setPreviewImageUrl(URL.createObjectURL(chosenFile));
        setUploadFile(chosenFile);
      } else {
        setPreviewImageUrl(previewImageUrl);
      }
    }
  };

  return (
    <div className="flex-col space-y-4 w-[80vw] h-[100vh] m-6">
      <div className="outlineBox">
        <div className="flex flex-row">
          <textarea
            className="promptTextArea w-full"
            name="prompt"
            placeholder={`Enter your prompt ideas here : \n Guidance Scale, Sampling Method & Seed Are Optional`}
            rows={4}
            onChange={(e) => {
              handlePromptDetails(promptDetails, setPromptDetails, e);
            }}
            id="prompt-idea"
          />
        </div>
        <div className="flex flex-row">
          <input
            name="guidance_scale"
            id="guidance_scale"
            className="promptTextArea"
            type="number"
            placeholder="Guidance Scale"
            onChange={(e) =>
              handlePromptDetails(promptDetails, setPromptDetails, e)
            }
          />
          <input
            name="sampling_method"
            id="sampling_method"
            className="promptTextArea"
            type="string"
            placeholder="Sampling Method"
            onChange={(e) =>
              handlePromptDetails(promptDetails, setPromptDetails, e)
            }
          />
          <input
            name="seed"
            id="seed"
            className="promptTextArea"
            type="number"
            placeholder="Seed"
            onChange={(e) =>
              handlePromptDetails(promptDetails, setPromptDetails, e)
            }
          />
        </div>
      </div>
      {/* buttons! */}
      <div className="flex flex-row outlineBox p-1 justify-evenly">
        <input
          type="file"
          name="render"
          id="upload-render"
          accept="image/png, image/jpeg"
          className="hidden"
          onChange={(e) => {
            handleImagePreview(e);
          }}
        />
        <button
          className="w-[45%] max-h-[40px] "
          onClick={() => document.getElementById("upload-render")?.click()}
        >
          Preview
        </button>
        <button
          className="w-[45%] max-h-[40px] "
          onClick={() => {
            (document.getElementById("prompt-idea") as HTMLInputElement).value =
              "";
            setPreviewImageUrl("");
          }}
        >
          Clear All
        </button>
      </div>
      {/* Image preview box */}
      <div className=" flex justify-center items-center relative outlineBox text-violet-300 h-[60%]">
        <Image
          src={previewImageUrl ? previewImageUrl : LoadingImage}
          width={512}
          height={512}
          alt="preview"
          className=" preview-image relative object-contain h-full w-full"
        />
        {previewImageUrl && (
          <ImCross
            className="absolute right-10 cursor-pointer top-[3vh]"
            onClick={() => setPreviewImageUrl("")}
          />
        )}
        {previewImageUrl && (
          <button
            className="absolute submitPromptButton bg-violet-900 text-slate-100 bottom-0 inset-x-0"
            onClick={async () => {
              await submitRemixPrompt(
                promptDetails,
                uploadFile,
                dimensions,
                setUploadFile,
                setPreviewImageUrl,
                user,
                supabaseClient
              );
            }}
          >
            Submit Prompt
          </button>
        )}
      </div>
    </div>
  );
};

export default PromptSubmission;
