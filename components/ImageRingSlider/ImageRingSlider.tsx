import React, { Component, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { IPrompt } from '../../typescript';


const ImageRingSlider = ({ data }: any) => {

  const [imageData, setImageData] = useState<IPrompt[]>([])

  useEffect(() => {

    setImageData(data.sort(() => Math.random() - 0.5));

  }, [])

  return (
    <>
      <div>
        <div className='mx-10'>

          <Carousel width={"60%"} showThumbs={false} autoPlay interval={4000} transitionTime={4000} infiniteLoop showStatus={false}>
            {imageData.map((image: IPrompt) => (
              <div key={image.id} className="relative group ">
                <img src={image.render_image} className="max-h-[512px] object-fit" />
                {/* <p className="legend">Legend 1</p> */}
                <div className='font-light text-2xl absolute inset-0 group-hover:block hidden bg-black/50'>Posted By : {image.username}</div>
              </div>
            ))}



          </Carousel>

        </div>

      </div>
    </>
  );
};

export default ImageRingSlider;
