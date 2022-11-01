import React, { useEffect, useState } from "react";
import axios from "axios";
import { LexicaImage, LexicaImageArray } from "../../typescript";
import createSFWImageArray from "../../utils/createSFWImageArray";
import { url } from "inspector";

const Home = ({data}: LexicaImageArray) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [gridImageArray, setGridImageArray] = useState<LexicaImage[]>([]);

  useEffect(() => {
    setGridImageArray(createSFWImageArray(data));
    console.log("I have been called");
  }, [searchTerm]);



  return (
    <>
      <div>THe Home page for a logged in user</div>
      <div className="photo-grid">
        {gridImageArray.map((image) => (
          <div
            className={` cursor-pointer card ${
              image.height / image.width > 1 && "card-tall"
            } ${image.height / image.width < 1 && "card-wide"}   `}
            key={image.id}
            style={{ backgroundImage: `url(${image.src})` }}
          >
            {}
          </div>
        ))}
      </div>
      {/* <div className="grid grid-cols-3 gap-x-2 gap-y-3 grid-flow-row-dense">
        {gridImageArray.map((image) => (
          <img src={image.src} key={image.id} />
        ))}
      </div> */}
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  // Fetch data from external API

  const [artstation, fantasy, surreal, abstract, digitalPainting] = await Promise.all([
    (await axios.get(`https://lexica.art/api/v1/search?q=artstation`)).data.images,
    (await axios.get(`https://lexica.art/api/v1/search?q=fantasy`)).data.images,
    (await axios.get(`https://lexica.art/api/v1/search?q=surreal`)).data.images,
    (await axios.get(`https://lexica.art/api/v1/search?q=abstract`)).data.images,
    (await axios.get(`https://lexica.art/api/v1/search?q=digital painting`)).data.images,
  ]);

  const data = [...artstation,...fantasy,...surreal,...abstract,...digitalPainting]
  
  // const response = await axios.get(
  //   `https://lexica.art/api/v1/search?q=artstation`
  // );
  // const data: LexicaImageArray = response.data.images;

  // Pass data to the page via props
  return { props: { data} };
}
