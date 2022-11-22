const randomSortArray = (
  inputArray: any,
  setState: React.Dispatch<React.SetStateAction<any[]>>
) => {
    console.log("sorting by random")
  setState(inputArray.sort(() => Math.random() - 0.5));
};

export default randomSortArray;
