const getMeta = (url: string) => {
  const img = new Image();
  img.src = url;

  const height = img.height;
  const width = img.width;

  return {
    width,
    height,
  };
};

export default getMeta;
