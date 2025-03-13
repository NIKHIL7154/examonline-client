import { useAuth } from "@clerk/clerk-react";
import SetCard from "./SetCard";
import SetsLoading from "./SetsLoading";
import useQuestionSets from "./useQuestionSets";

const data = [
    {
        _id: "67b992708e1ca35da449d5e4",
        name: "Computer Basics 10",
        totalQuestions: 20,
        createdAt: new Date(Date.now()),
    },
    {
        _id: "67b992708e1rQ35da449d5e4",
        name: "General Knowledge",
        totalQuestions: 50,
        createdAt: new Date(Date.now()),
    },
    {
        _id: "67b992708e1rQ35da449d5e9",
        name: "Aptitude",
        totalQuestions: 90,
        createdAt: new Date(Date.now()),
    },
]

function SetSpawner() {
    const { getToken } = useAuth();
    const { isLoading, questionSets } = useQuestionSets(getToken);

    if (isLoading)
        return <SetsLoading />

    const { totalSets, sets } = questionSets.data;
    if(totalSets === 0) return <div>No Set found</div>

    return (
        <div className="flex flex-wrap gap-6 ">
            {sets.map((set) => {
                return <SetCard key={set._id} setItem={set} />
            })}

        </div>
    );
}

export default SetSpawner;
