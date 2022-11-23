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
        <div className="flex left-[50%] p-2  space-x-1  justify-center  bg-black/50 rounded-lg" >
            <button
                title="Sort By Random"
                onClick={() => setSortedData([...randomSortArray(sortedData)])}
            >
                🎲 Random
            </button>
            <button title="Sort By Latest" onClick={() => setSortedData([...data]) }>
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
                        instancePrompt={instancePrompt}
                        classPrompt={classPrompt}
                        setInstancePrompt={setInstancePrompt}
                        setClassPrompt={setClassPrompt}
                    />
                </div>
            </GenericModal>
        </div>
    );
};

export default RemixToolBar;
