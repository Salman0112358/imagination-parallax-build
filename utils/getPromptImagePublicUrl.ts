import { User } from "@supabase/auth-helpers-react";
import { supabase } from "./supabaseClient";

const getPromptImagePublicUrl = async (fileName: string, user: User) => {
  console.log("looking for ", `images/${user.id}/` + fileName);
  const { data } = supabase.storage
    .from("user-images")
    .getPublicUrl(`images/${user.id}/` + fileName);

  return data.publicUrl;
};

export default getPromptImagePublicUrl;
