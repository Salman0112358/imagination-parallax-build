import { LexicaImageArray } from "../../typescript";

const ImageGrid = ({ data }: LexicaImageArray): JSX.Element => {
  return (
    <div className="photo-grid">
      {data.map((image) => (
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
  );
};

export default ImageGrid;
