import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTests } from "../../services/apiTests";
import { useSearchParams } from "react-router";
import { PAGE_SIZE } from "../../utils/globals";
// import { getTests } from "../../../services/apiTests";

export default function useTests(authtoken: () => Promise<string | null>) {
    const [searchParams] = useSearchParams();
    const queryClient = useQueryClient();

    // FILTER
    const filterValue = searchParams.get("status");

    const filter = !filterValue || filterValue === "all"
        ? undefined
        : { field: "status", value: filterValue }

    // SORT
    const sortBy = searchParams.get("sortBy") || "createdAt-desc";

    // PAGINATION
    const page = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));

    // QUERY
    const { isLoading, data: tests, error } = useQuery({
        queryKey: ["tests", filter, sortBy, page],
        queryFn: () => getTests(authtoken, filter, sortBy, page),
    });


    // PRE - FETCHING
    const pageCount = Math.ceil(tests?.data?.totalTests / PAGE_SIZE);

    if (page < pageCount)
        queryClient.prefetchQuery({
            queryKey: ["tests",filter, sortBy, page + 1],
            queryFn: () => getTests(authtoken,filter, sortBy, page + 1),
        })

    if (page > 1)
        queryClient.prefetchQuery({
            queryKey: ["tests", sortBy, page - 1],
            queryFn: () => getTests(authtoken,filter, sortBy, page - 1),
        })

    return { isLoading, tests, error };
}