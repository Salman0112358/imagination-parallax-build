import React, { useEffect, useState } from "react";
import axios from "axios";
import { LexicaImage, LexicaImageArray } from "../../typescript";
import createSFWImageArray from "../../utils/createSFWImageArray";
import ImageGrid from "../../components/ImageGrid/ImageGrid";


const Home = ({data}: LexicaImageArray) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [gridImageArray, setGridImageArray] = useState<LexicaImage[]>([]);

  useEffect(() => {
    setGridImageArray(createSFWImageArray(data));
    console.log("I have been called");
  }, [searchTerm]);



  return (
    <>
      <ImageGrid data={data}/>
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  // Fetch data from external API

  const data = await Promise.all([
    ...(await axios.get(`https://lexica.art/api/v1/search?q=artstation`)).data.images,
    ...(await axios.get(`https://lexica.art/api/v1/search?q=fantasy`)).data.images,
    ...(await axios.get(`https://lexica.art/api/v1/search?q=surreal`)).data.images,
    ...(await axios.get(`https://lexica.art/api/v1/search?q=abstract`)).data.images,
    ...(await axios.get(`https://lexica.art/api/v1/search?q=digital painting`)).data.images,
    ...(await axios.get(`https://lexica.art/api/v1/search?q=cyberpunk`)).data.images,
    ...(await axios.get(`https://lexica.art/api/v1/search?q=huge scene`)).data.images,
    ...(await axios.get(`https://lexica.art/api/v1/search?q=trending on artstation`)).data.images,
    ...(await axios.get(`https://lexica.art/api/v1/search?q=wallpaper`)).data.images,
  ]);

 
  return { props: { data} };
}
