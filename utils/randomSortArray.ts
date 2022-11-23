const randomSortArray = (inputArray: any) => {
  const randomArray = inputArray.sort(() => Math.random() - 0.5);
  return randomArray;
};

export default randomSortArray;
