import React from "react";
import AccordionCard from "../../components/AccordionCard/AccordionCard";
import { IPrompt, IUserProfile } from "../../typescript";
import { supabase } from "../../utils/supabaseClient";

interface ICommunityPage {
  data: IPrompt[];
  userList: IUserProfile[];
}

const CommunityPage = ({ data, userList }: ICommunityPage) => {
  return (
    <>
      <div className="mt-[8vh]">
        <AccordionCard data={data} userList={userList}/>
      </div>
    </>
  );
};

export default CommunityPage;

export async function getServerSideProps() {
  const { data, error } = await supabase
    .from("remix_prompts")
    .select("*")
    .order("inserted_at", { ascending: false });

  const userList = (await supabase.from("profiles").select("*")).data;
  return { props: { data, userList } };
}
