import React, { useState } from "react";
import Image from "next/image";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { ImCross } from "react-icons/im";
import LoadingImage from "../../assets/images/Loading-Preview.gif";
import compressInputImageAndUpload from "../../utils/compressInputImageAndUpload";

import addTextAtCursor from "../../utils/addTextAtCursor";

const PromptSubmission = () => {
  const [promptIdea, setPromptIdea] = useState("");
  const [previewImageUrl, setPreviewImageUrl] = useState<string>("");
  const [uploadFile, setUploadFile] = useState<File | null>();

  console.log(uploadFile?.text, uploadFile?.name);

  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const handlePromptSubmission = async () => {
    if (!promptIdea || !uploadFile || !user) {
      return window.alert(
        "You Must Be Logged In, And Have A Prompt With A Preview Image To Submit!"
      );
    }

    if (
      !promptIdea.includes("{INSTANCE_PROMPT}") &&
      !promptIdea.includes("{CLASS PROMPT}")
    ) {
      return window.alert(
        "Your Prompt must include placeholders for the INSTANCE and CLASS"
      );
    } else {
      const imagePublicUrl = await compressInputImageAndUpload(
        uploadFile,
        user
      );

      setPreviewImageUrl("");
      setUploadFile(null);
      setPromptIdea("");

      let username = (
        await supabaseClient
          .from("profiles")
          .select(`username`)
          .eq("id", user.id)
          .single()
      ).data?.username;

      const { data, error } = await supabaseClient
        .from("remix_prompts")
        .insert([
          {
            prompt: promptIdea,
            render_image: imagePublicUrl,
            user_id: user?.id,
            username,
          },
        ]);
    }
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

  const refreshPromptList = () => {
    router.replace(router.asPath, undefined, { scroll: false });
  };

  return (
    <div className="flex flex-row space-x-10">
      <div className="outlineBox h-[25vh]">
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
              id="prompt-idea"
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
            onChange={(e) => {
              handleImagePreview(e);
            }}
          />

          <button
            className="submitPromptButton py-2"
            title="Highlight the part of your prompt you want to replace with the instance and class placeholders"
            onClick={() =>
              addTextAtCursor("prompt-idea", "{INSTANCE_PROMPT} {CLASS_PROMPT}")
            }
          >
            Add Instance And Class
          </button>

          <button
            className="submitPromptButton"
            onClick={() => document.getElementById("upload-render")?.click()}
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
          {promptIdea && (
            <button
              className="submitPromptButton"
              onClick={() => {
                setPromptIdea("");
                setPreviewImageUrl("");
              }}
            >
              Clear All
            </button>
          )}
        </div>
      </div>
      <div className="  w-full relative outlineBox text-violet-300 h-[80vh]">
        <Image
          src={previewImageUrl ? previewImageUrl : LoadingImage}
          width={512}
          height={512}
          alt="preview"
          className=" preview-image relative object-cover max-h- "
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
              await handlePromptSubmission();
              refreshPromptList();
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
