import cleanUpRemixPromotSubmission from "./cleanUpRemixPromptSubmission";
import compressInputImageAndUpload from "./compressInputImageAndUpload";

const submitRemixPrompt = async (
  promptDetails: any,
  uploadFile: any,
  dimensions: any,
  setUploadFile: any,
  setPreviewImageUrl: any,
  user: any,
  supabaseClient: any
) => {
  if (!promptDetails.prompt || !uploadFile || !user) {
    return window.alert(
      "You Must Be Logged In, And Have A Prompt With A Preview Image To Submit!"
    );
  }

  if (
    !promptDetails.prompt.includes("{INSTANCE_PROMPT}") &&
    !promptDetails.prompt.includes("{CLASS PROMPT}")
  ) {
    return window.alert(
      "Your Prompt must include placeholders for the INSTANCE and CLASS"
    );
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

    const { data, error } = await supabaseClient.from("remix_prompts").insert([
      {
        prompt: promptDetails.prompt,
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
