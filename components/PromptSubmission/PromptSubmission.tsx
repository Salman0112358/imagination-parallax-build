import React, { useState } from "react";
import Image from "next/image";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { ImCross } from "react-icons/im";
import LoadingImage from "../../assets/images/Loading-Preview.gif";
import compressInputImageAndUpload from "../../utils/compressInputImageAndUpload";

const PromptSubmission = () => {
  const [promptIdea, setPromptIdea] = useState("");
  const [previewImageUrl, setPreviewImageUrl] = useState<string>("");
  const [uploadFile, setUploadFile] = useState<File | null>();

  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const handlePromptSubmission = async () => {
    if (!promptIdea || !uploadFile || !user) {
      window.alert(
        "You Must Be Logged In, And Have A Prompt With A Preview Image To Submit!"
      );
    } else {
      const imagePublicUrl = await compressInputImageAndUpload(
        uploadFile,
        user
      );

      setPreviewImageUrl("");
      setUploadFile(null);
      setPromptIdea("");

      const { data, error } = await supabaseClient.from("prompts").insert([
        {
          prompt: promptIdea,
          render_image: imagePublicUrl,
          user_id: user?.id,
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
    router.replace(router.asPath);
  };

  return (
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

          <button className="submitPromptButton py-2">Artist Ideas</button>
          <button className="submitPromptButton py-2">Composition</button>
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
        </div>
      </div>
      <div className="relative outlineBox text-violet-300">
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

        <Image
          src={previewImageUrl ? previewImageUrl : LoadingImage}
          alt="render preview"
          width={512}
          height={512}
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default PromptSubmission;
