import { LexicaImage } from "../typescript";

const cleanSFWImageArray = (data: LexicaImage[]) : LexicaImage[] => {
  const cleanArray = data.filter((element: LexicaImage) => element.nsfw === false);
  return cleanArray
};

export default cleanSFWImageArray;
