import { useUser } from "@supabase/auth-helpers-react";
import React, { useEffect, useState } from "react";
import { IPrompt } from "../../typescript";
import extractUserRemixSubmissions from "../../utils/extractUserRemixSubmissions";
import randomSortArray from "../../utils/randomSortArray";
import { GenericModal } from "../GenericModal/GenericModal";
import PromptInstanceAndClassInput from "../PromptInstanceAndClassInput/PromptInstanceAndClassInput";
import PromptSubmission from "../PromptSubmission/PromptSubmission";

const RemixToolBar = ({
    sortedData,
    setSortedData,
    instancePrompt,
    classPrompt,
    setInstancePrompt,
    setClassPrompt,
    data,
}: any) => {

    const [userSubmissions, setUserSubmissions] = useState<IPrompt[]>([]);

    const user = useUser();

    useEffect(() => {
        user && setUserSubmissions(extractUserRemixSubmissions(data, user.id));
    }, [user]);

    return (
        <div className=" fixed left-0 top-[30%] m-2 z-[50] max-[720px]:hidden outlineBox  space-y-1 flex flex-col justify-center ">
            <button
                title="Sort By Random"
                onClick={() => randomSortArray(sortedData, setSortedData)}
            >
                🎲
            </button>
            <button title="Sort By Latest" onClick={() => setSortedData(data)}>
                🔥
            </button>
            {user && (
                <button
                    title="Show Only Your Submissions"
                    onClick={() => setSortedData(userSubmissions)}
                >
                    👤
                </button>
            )}
            <GenericModal modalText="💡">
                <PromptSubmission />
            </GenericModal>
            <GenericModal modalText="🖊️">
                <div className="flex flex-row">
                    <PromptInstanceAndClassInput
                        instancePrompt={instancePrompt}
                        classPrompt={classPrompt}
                        setInstancePrompt={setInstancePrompt}
                        setClassPrompt={setClassPrompt}
                    />
                </div>
            </GenericModal>
            <button
                title="Clear The Instance And Class"
                onClick={() => {
                    setClassPrompt("");
                    setInstancePrompt("");
                }}
            >
                🧻
            </button>
        </div>
    );
};

export default RemixToolBar;
