import React from "react";
import ImageRingSlider from "../../components/ImageRingSlider/ImageRingSlider";
import UsersList from "../../components/UsersList/UsersList";
import { supabase } from "../../utils/supabaseClient";

const index = ({ data, userList }: any) => {

  console.log(userList)

  return (
    <>
      <div className="flex flex-row mt-[10vh] mx-5">
        <div className="w-1/2">
          <UsersList userList={userList} />
        </div>
        <div className="w-1/2">
          <ImageRingSlider data={data} />
        </div>

      </div>

    </>

  );
};

export default index;

export async function getServerSideProps() {
  const { data, error } = await supabase
    .from("remix_prompts")
    .select("*")
    .order("inserted_at", { ascending: false });

  const userList = (await supabase.from("profiles").select("*")).data
  return { props: { data, userList } };
}
