import { IPrompt } from "../typescript";

const extractUserRemixSubmissions = (data: IPrompt[], userId: string) => {
  return data.filter((image) => {
    console.log(image.user_id, userId);
    return image.user_id === userId;
  });
};

export default extractUserRemixSubmissions;
