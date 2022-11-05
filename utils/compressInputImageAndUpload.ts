import { User } from "@supabase/auth-helpers-react";
import Compressor from "compressorjs";
import getPromptImage from "./getPromptImage";
import { supabase } from "./supabaseClient";

const compressInputImageAndUpload = async (imageFile: File, user: User) => {
   new Compressor(imageFile, {
    convertSize: 200,
    convertTypes: "image/png,image/webp",
    quality: 0.6,

    async success(result) {
      const formData = new FormData();

      formData.append("file", result, "imageman");

      const dynamicFileName = imageFile.name + "-" + new Date()

      const { data, error } = await supabase.storage
        .from("user-images")
        .upload(
          `images/${user.id}/` + dynamicFileName,
          formData,
          {
            cacheControl: "3600",
            upsert: false,
          }
        );

      console.log("Compression & upload success");

      console.log("The uploaded image public url is " ,getPromptImage(dynamicFileName, user))

    },
    error(err) {
      console.log(err.message);
    },
  });

 

};

export default compressInputImageAndUpload;
