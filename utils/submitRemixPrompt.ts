import { SupabaseClient, User } from "@supabase/auth-helpers-react";
import { toast } from "react-toastify";
import { IPromptDetails } from "../typescript";
import cleanUpRemixPromotSubmission from "./cleanUpRemixPromptSubmission";
import compressInputImageAndUpload from "./compressInputImageAndUpload";

const submitRemixPrompt = async (
  promptDetails: IPromptDetails,
  uploadFile: File | null | undefined,
  dimensions: number[],
  setUploadFile: React.Dispatch<React.SetStateAction<File | null | undefined>>,
  setPreviewImageUrl: React.Dispatch<React.SetStateAction<string>>,
  user: User | null,
  supabaseClient: SupabaseClient<any, "public", any>
) => {
  if (!promptDetails.prompt || !uploadFile || !user) {
    return window.alert(
      "You Must Be Logged In, And Have A Prompt With A Preview Image To Submit!"
    );
  }

  if (
    window.localStorage.getItem("instance") === null || window.localStorage.getItem("instance") === "{INSTANCE_PROMPT}" || !promptDetails.prompt.includes(window.localStorage.getItem("instance") as string)
  ) {
    return window.alert('Your prompt must include a valid instance prompt. Go back and click "🖊️ remix" to set it')
    // return toast.error(
    //   'Your prompt must include a valid instance prompt. Go back and click "🖊️ remix" to set it',
    //   { autoClose: 5000, hideProgressBar: false }
    // );
  } else {
    const imagePublicUrl = await compressInputImageAndUpload(uploadFile, user);
    console.log(imagePublicUrl);

    let username = (
      await supabaseClient
        .from("profiles")
        .select(`username`)
        .eq("id", user.id)
        .single()
    ).data?.username;

    const formattedPromptString = promptDetails.prompt
      .replace(localStorage.getItem("instance") as string, "{INSTANCE_PROMPT}")
      .replace(localStorage.getItem("class") as string, "{CLASS_PROMPT}");

    const { data, error } = await supabaseClient.from("remix_prompts").insert([
      {
        prompt: formattedPromptString,
        render_image: imagePublicUrl,
        user_id: user?.id,
        username,
        natural_width: dimensions[0],
        natural_height: dimensions[1],
        guidance_scale: promptDetails.guidance_scale,
        sampling_method: promptDetails.sampling_method,
        seed: promptDetails.seed,
      },
    ]);

    const currentPost = await supabaseClient
      .from("profiles")
      .select("submissions")
      .eq("id", user.id);

    if (currentPost.data) {
      await supabaseClient
        .from("profiles")
        .update({ submissions: Number(currentPost.data[0].submissions + 1) })
        .eq("id", user.id)
        .select();
    }

    setPreviewImageUrl("");
    setUploadFile(null);
    cleanUpRemixPromotSubmission();
  }
};

export default submitRemixPrompt;
