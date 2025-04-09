import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { useParams } from "react-router";
import { getAnalytics } from "../../services/apiAnalytics";
import { useSearchParams } from "react-router";
// import { getTest } from "../../services/apiTests";

export default function useAnalytics(authtoken: () => Promise<string | null>) {
    // const { testId } = useParams();
    const [searchParams] = useSearchParams();
    const queryClient = useQueryClient();

    const filterValue = searchParams.get("proctured") || "false";

    const filter = { field: "proctured", value: filterValue }

    const { isLoading, data: analytics, error } = useQuery({
        queryKey: ["analytics", filterValue],
        queryFn: () => getAnalytics(authtoken, filter),
        // queryFn: getQuestionSets as () => Promise<string | null>,
    });

    if (filterValue === "false")
        queryClient.prefetchQuery({
            queryKey: ["analytics", "true"],
            queryFn: () => getAnalytics(authtoken, { field: "proctured", value: "true" }),
        })
    else
        queryClient.prefetchQuery({
            queryKey: ["analytics", "false"],
            queryFn: () => getAnalytics(authtoken, { field: "proctured", value: "false" }),
        })

    return { isLoading, analytics, error };
}