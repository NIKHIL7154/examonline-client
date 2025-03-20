import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getQuestionSets } from "../../services/apiQuestionSets";
import { useSearchParams } from "react-router";
import { PAGE_SIZE } from "../../utils/globals";
// import { getQuestionSets } from "../../../services/apiQuestionSets";

export default function useQuestionSets(authtoken: () => Promise<string | null>) {
    const [searchParams] = useSearchParams();
    const queryClient = useQueryClient();

    // SORT
    const sortBy = searchParams.get("sortBy") || "createdAt-desc";

    // PAGINATION
    const page = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));

    // QUERY
    const { isLoading, data: questionSets, error } = useQuery({
        queryKey: ["questionSets", sortBy, page],
        queryFn: () => getQuestionSets(authtoken, sortBy, page),
        // queryFn: getQuestionSets as () => Promise<string | null>,
    });

    // PRE - FETCHING
    const pageCount = Math.ceil(questionSets?.data?.totalSets / PAGE_SIZE);

    if (page < pageCount)
        queryClient.prefetchQuery({
            queryKey: ["questionSets", sortBy, page + 1],
            queryFn: () => getQuestionSets(authtoken, sortBy, page + 1),
        })

    if (page > 1)
        queryClient.prefetchQuery({
            queryKey: ["questionSets", sortBy, page - 1],
            queryFn: () => getQuestionSets(authtoken, sortBy, page - 1),
        })

    return { isLoading, questionSets, error };
}