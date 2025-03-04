import { useQuery } from "@tanstack/react-query";
import { getQuestionSet } from "../../../services/apiQuestionSets";
import { useParams } from "react-router-dom";

export default function useQuestionSet(authtoken: () => Promise<string | null>) {
    const { setId } = useParams();

    const { isLoading, data: questionSet, error } = useQuery({
        queryKey: ["questionSets", setId],
        queryFn: () => getQuestionSet(authtoken, setId as string),
    });

    return { isLoading, questionSet, error };
}