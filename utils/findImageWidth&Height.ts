const findImageWidthAndHeight = (chosenFile: File, setDimensions: React.Dispatch<React.SetStateAction<number[]>>) => {

    const reader = new FileReader();
    reader.readAsDataURL(chosenFile)

    reader.onload = (e: ProgressEvent<FileReader>) => {


        let image = new window.Image()
        image.src = e.target?.result as string
        image.onload = function () {
            const imgWidth = image.naturalWidth;
            const imgHeight = image.naturalHeight;


            setDimensions([imgWidth, imgHeight])


        };
    }
}

export default findImageWidthAndHeight