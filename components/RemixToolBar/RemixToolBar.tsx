import { useUser } from "@supabase/auth-helpers-react";
import React, { useEffect, useState } from "react";
import { IPrompt, IUserInstanceAndClass } from "../../typescript";
import extractUserRemixSubmissions from "../../utils/extractUserRemixSubmissions";
import randomSortArray from "../../utils/randomSortArray";
import { GenericModal } from "../GenericModal/GenericModal";
import PromptInstanceAndClassInput from "../PromptInstanceAndClassInput/PromptInstanceAndClassInput";
import PromptSubmission from "../PromptSubmission/PromptSubmission";

interface IRemixToolBar {
  setSortedData: React.Dispatch<React.SetStateAction<IPrompt[]>>;
  data: IPrompt[];
  userInstanceAndClass: IUserInstanceAndClass;
  setUserInstanceAndClass: React.Dispatch<
    React.SetStateAction<IUserInstanceAndClass>
  >;
}

const RemixToolBar = ({
  setSortedData,
  data,
  userInstanceAndClass,
  setUserInstanceAndClass,
}: IRemixToolBar) => {
  const [userSubmissions, setUserSubmissions] = useState<IPrompt[]>([]);

  const user = useUser();

  useEffect(() => {
    user && setUserSubmissions(extractUserRemixSubmissions(data, user.id));
  }, [user, data]);

  return (
    <div className="flex left-[50%] p-2  space-x-1  justify-center  bg-black/50 rounded-lg">
      <button
        title="Sort By Random"
        onClick={() => {
          setSortedData([...randomSortArray([...data])]);
        }}
      >
        🎲 Random
      </button>
      <button title="Sort By Latest" onClick={() => setSortedData([...data])}>
        🔥 Newest
      </button>
      {user && (
        <button
          title="Show Only Your Submissions"
          onClick={() => setSortedData(userSubmissions)}
        >
          👤 Submitted
        </button>
      )}
      <GenericModal modalText="💡 Upload">
        <PromptSubmission />
      </GenericModal>
      <GenericModal modalText="🖊️ Remix">
        <div className="flex flex-row">
          <PromptInstanceAndClassInput
            userInstanceAndClass={userInstanceAndClass}
            setUserInstanceAndClass={setUserInstanceAndClass}
          />
        </div>
      </GenericModal>
    </div>
  );
};

export default RemixToolBar;
