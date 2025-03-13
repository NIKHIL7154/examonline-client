import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getTest } from "../../services/apiTests";

export default function useTest(authtoken: () => Promise<string | null>) {
    const { testId } = useParams();

    const { isLoading, data: test, error } = useQuery({
        queryKey: ["tests", testId],
        queryFn: () => getTest(authtoken, testId as string),
        // queryFn: getQuestionSets as () => Promise<string | null>,
    });

    return { isLoading, test, error };
}