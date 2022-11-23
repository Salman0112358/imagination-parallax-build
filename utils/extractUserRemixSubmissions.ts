import { IPrompt } from "../typescript";

const extractUserRemixSubmissions = (data: IPrompt[], userId: string) => {
  return data.filter((image) => {
    return image.user_id === userId;
  });
};

export default extractUserRemixSubmissions;
