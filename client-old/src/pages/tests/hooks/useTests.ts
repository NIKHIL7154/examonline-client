import { useQuery } from "@tanstack/react-query";
import { getTests } from "../../../services/apiTests";

export default function useTests(authtoken: () => Promise<string | null>) {
    const { isLoading, data: tests, error } = useQuery({
        queryKey: ["tests"],
        queryFn: () => getTests(authtoken) ,
        // queryFn: getQuestionSets as () => Promise<string | null>,
    });

    return { isLoading, tests, error };
}