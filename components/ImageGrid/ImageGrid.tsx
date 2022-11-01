import { LexicaImageArray } from "../../typescript";
import HeadlessModal from "../HeadlessModal/HeadlessModal";

const ImageGrid = ({ data }: LexicaImageArray): JSX.Element => {
  return (
    <div className="photo-grid">
      {data.map((image) => (
        <div
          className={` group cursor-pointer card ${
            image.height / image.width > 1 && "card-tall"
          } ${image.height / image.width < 1 && "card-wide"}   `}
          key={image.id}
          style={{ backgroundImage: `url(${image.src})` }}
        >
          <HeadlessModal image={image} />

          {}
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
