import { User } from "@supabase/auth-helpers-react";
import Compressor from "compressorjs";
import getPromptImagePublicUrl from "./getPromptImagePublicUrl";
import { supabase } from "./supabaseClient";

const compressInputImageAndUpload = async (
  imageFile: File,
  user: User
): Promise<string> => {
  const dynamicFileName = imageFile.name + "-" + new Date();

  new Compressor(imageFile, {
    convertSize: 200,
    convertTypes: "image/png,image/webp",
    quality: 0.6,

    async success(result) {
      const formData = new FormData();

      formData.append("file", result, "imageman");

      const { data, error } = await supabase.storage
        .from("user-images")
        .upload(`images/${user.id}/` + dynamicFileName, formData, {
          cacheControl: "3600",
          upsert: false,
        });

      console.log("Compression & upload success");
    },
    error(err) {
      console.log(err.message);
    },
  });

  return getPromptImagePublicUrl(dynamicFileName, user);
};

export default compressInputImageAndUpload;
