import { useAuth } from "@clerk/clerk-react";
import useQuestionSet from "./hooks/useQuestionSet";
import Spinner from "../../components/Spinner";

function QuestionSetPage() {
    const { getToken } = useAuth();
    const { isLoading, questionSet } = useQuestionSet(getToken);

    if (isLoading) return <Spinner />;  
    const {set} = questionSet.data;

    return (
        <div>
            <h3 className="font-medium">Question Set: {set._id}</h3>
            <h4>{set.name}</h4>
        </div>
    );
}

export default QuestionSetPage;
