import { useQuery } from "@tanstack/react-query";
import { getQuestionSets } from "../../services/apiQuestionSets";
// import { getQuestionSets } from "../../../services/apiQuestionSets";

export default function useQuestionSets(authtoken: () => Promise<string | null>) {
    const { isLoading, data: questionSets, error } = useQuery({
        queryKey: ["questionSets"],
        queryFn: () => getQuestionSets(authtoken) ,
        // queryFn: getQuestionSets as () => Promise<string | null>,
    });

    return { isLoading, questionSets, error };
}