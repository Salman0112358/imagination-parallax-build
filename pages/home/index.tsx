import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import axios from "axios";
import { LexicaImage, LexicaImageArray } from "../../typescript";
import createSFWImageArray from "../../utils/createSFWImageArray";

const Home = ({ data }: LexicaImageArray) => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [gridImageArray, setGridImageArray] = useState<LexicaImage[]>([]);

  useEffect(() => {
    setGridImageArray(createSFWImageArray(data));
    console.log("I have been called")
  }, [searchTerm]);

 const hanldeSearchTerm = (event : React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    router.push(`/?term=${searchTerm}`)
 }

  return (
    <>
      <div>THe Home page for a logged in user</div>
      <input 
      type="text"
      placeholder="search through stable diffusion"
      value={searchTerm}
      onChange={(event) => {
        setSearchTerm(event.target.value);
      }}
       ></input>
      <div className="grid grid-cols-3 gap-x-2 gap-y-3 grid-flow-row-dense">
        {gridImageArray.map((image) => (
          <img src={image.src} key={image.id} />
        ))}
      </div>
    </>
  );
};

export default Home;

export async function getServerSideProps() {

  
  // Fetch data from external API
  const response = await axios.get(
    `https://lexica.art/api/v1/search?q=fantasy`
  );
  const data: LexicaImageArray = response.data.images;

  // Pass data to the page via props
  return { props: { data } };
}
