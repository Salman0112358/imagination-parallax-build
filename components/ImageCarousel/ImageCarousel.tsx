import React from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { IPrompt } from "../../typescript";

const ImageCarousel = ({ data }: { data: IPrompt[] }) => {
  return (
    <>
      <Carousel
        width={"50%"}
        showThumbs={false}
        autoPlay={true}
        interval={1000}
        infiniteLoop={true}
        showIndicators={false}
        dynamicHeight={false}
      >
        {data.map((image) => (
          <div className="m-auto" key={image.id}>
            <img
              src={image.render_image}
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                display: "flex",
                justifyContent: "center",
              }}
            />
            {/* <p className="legend">Legend 1</p> */}
          </div>
        ))}
      </Carousel>
    </>
  );
};

export default ImageCarousel;
