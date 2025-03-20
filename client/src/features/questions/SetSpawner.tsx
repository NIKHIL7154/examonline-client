import { useAuth } from "@clerk/clerk-react";
import SetCard, { Set } from "./SetCard";
import SetsLoading from "./SetsLoading";
import useQuestionSets from "./useQuestionSets";
import Pagination from "../../ui/Pagination";
import Empty from "../../ui/Empty";

function SetSpawner() {
    const { getToken } = useAuth();
    const { isLoading, questionSets } = useQuestionSets(getToken);

    if (isLoading)
        return <SetsLoading />

    const { totalSets, sets } = questionSets.data;

    if (!sets?.length) return <Empty resourceName="questions sets"/>
    
    return (
        <>
            <div className="flex flex-wrap gap-5 ">
                {sets.map((set: Set) => {
                    return <SetCard key={set._id} setItem={set} />
                })}

            </div>

            <Pagination count={totalSets}/>
        </>
    );
}

export default SetSpawner;
