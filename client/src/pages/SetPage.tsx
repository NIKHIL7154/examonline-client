import { useAuth } from "@clerk/clerk-react";
import useQuestionSet from "../features/questions/useQuestionSet";

function SetPage() {
    const { getToken } = useAuth();
    const { isLoading, questionSet } = useQuestionSet(getToken);

    if (isLoading) return <div> Loading</div>;
    const { set } = questionSet.data;

    return (
        <div>
            <h3 className="font-medium">Question Set: {set._id}</h3>
            <h4>{set.name}</h4>
        </div>
    );
}

export default SetPage;
