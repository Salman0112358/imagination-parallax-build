

const randomiseArray = (sortType: string, data: any[], stateSetter: React.SetStateAction<any[]>) => {

    if (sortType === "random") {
        stateSetter(data.sort(() => Math.random() - 0.5));
    } else {
        stateSetter(data);
    }

}

export default randomiseArray