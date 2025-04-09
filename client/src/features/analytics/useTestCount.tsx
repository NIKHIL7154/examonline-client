import { useQuery } from "@tanstack/react-query";
import { getTestCount } from "../../services/apiAnalytics";

export default function useTestCount(authtoken: () => Promise<string | null>) {

    const { isLoading, data: testCount, error } = useQuery({
        queryKey: ["testCount"],
        queryFn: () => getTestCount(authtoken),
    });

    return { isLoading, testCount, error };
}