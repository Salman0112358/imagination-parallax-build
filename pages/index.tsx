import React, { useEffect, useState } from "react";
import axios from "axios";
import { LexicaImage, LexicaImageArray } from "../typescript";
import createSFWImageArray from "../utils/createSFWImageArray";
import ImageGrid from "../components/ImageGrid/ImageGrid";
import Head from "next/head";

const Home = ({ data }: LexicaImageArray) => {
  const [gridImageArray, setGridImageArray] = useState<LexicaImage[]>([]);

  useEffect(() => {
    setGridImageArray(createSFWImageArray(data));
  }, [data]);

  return (
    <>
      <div className="relative h-[10vh] bg-gradient-to-b">
        <Head>
          <title>Home</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </div>
      <main className="relative px-10 pb-24 lg:space-y-24">
        <ImageGrid data={gridImageArray} />
      </main>
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  // Fetch data from external API

  try {
    const data = await Promise.all([
      ...(
        await axios.get(`https://lexica.art/api/v1/search?q=artstation`)
      ).data.images,
      ...(
        await axios.get(`https://lexica.art/api/v1/search?q=fantasy`)
      ).data.images,
      ...(
        await axios.get(`https://lexica.art/api/v1/search?q=surreal`)
      ).data.images,
      ...(
        await axios.get(`https://lexica.art/api/v1/search?q=abstract`)
      ).data.images,
      ...(
        await axios.get(`https://lexica.art/api/v1/search?q=digital painting`)
      ).data.images,
      ...(
        await axios.get(`https://lexica.art/api/v1/search?q=cyberpunk`)
      ).data.images,
      ...(
        await axios.get(`https://lexica.art/api/v1/search?q=huge scene`)
      ).data.images,
      ...(
        await axios.get(
          `https://lexica.art/api/v1/search?q=trending on artstation`
        )
      ).data.images,
      ...(
        await axios.get(`https://lexica.art/api/v1/search?q=wallpaper`)
      ).data.images,
    ]);

    return { props: { data } };
  } catch (error) {
    console.error(error);
    console.log("No Images Retrieved");
  }
}
