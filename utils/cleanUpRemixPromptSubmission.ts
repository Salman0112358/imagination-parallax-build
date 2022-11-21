const cleanUpRemixPromotSubmission = () => {
  (document.getElementById("prompt-idea") as HTMLTextAreaElement).value = "";
  (document.getElementById("guidance_scale") as HTMLInputElement).value = "";
  (document.getElementById("sampling_method") as HTMLInputElement).value = "";
  (document.getElementById("seed") as HTMLInputElement).value = "";
};

export default cleanUpRemixPromotSubmission;
