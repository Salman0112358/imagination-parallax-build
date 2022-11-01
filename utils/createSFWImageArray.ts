import { LexicaImage } from "../typescript";

const cleanSFWImageArray = (data: LexicaImage[]): LexicaImage[] => {
  const cleanArray = data.filter(
    (element: LexicaImage) => element.nsfw === false && element.grid === false
  );

  const uniqueIds: string[] = [];

  const uniqueImageArray = cleanArray.filter((element) => {
    const isDuplicate = uniqueIds.includes(element.id);

    if (!isDuplicate) {
      uniqueIds.push(element.id);

      return true;
    }

    return false;
  });

  return uniqueImageArray.sort(() => Math.random() - 0.5);
};

export default cleanSFWImageArray;
