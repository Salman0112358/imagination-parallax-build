import React, { useState } from "react";
import MostLikedPost from "../../components/MostLikedPost/MostLikedPost";
import PromptKeywordCounter from "../../components/PromptKeywordCounter/PromptKeywordCounter";
import UsersList from "../../components/UsersList/UsersList";
import { IPrompt, IUserProfile } from "../../typescript";
import { supabase } from "../../utils/supabaseClient";

interface ICommunityPage {
  data: IPrompt[];
  userList: IUserProfile[];
}

const CommunityPage = ({ data, userList }: ICommunityPage) => {
  return (
    <>
      <div className="flex flex-row mt-[8vh] mx-5 w-screen space-x-5">
        <UsersList userList={userList} />
        <MostLikedPost data={data} />
        <PromptKeywordCounter data={data} />
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
