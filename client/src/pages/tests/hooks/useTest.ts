import { useQuery } from "@tanstack/react-query";
import { getTest } from "../../../services/apiTests";
import { useParams } from "react-router-dom";

export default function useTest(authtoken: () => Promise<string | null>) {
    const { testId } = useParams();

    const { isLoading, data: test, error } = useQuery({
        queryKey: ["tests", testId],
        queryFn: () => getTest(authtoken, testId as string),
        // queryFn: getQuestionSets as () => Promise<string | null>,
    });

    return { isLoading, test, error };
}