import { useQuery } from "@tanstack/react-query";
import { getTestsNext15 } from "../../services/apiTests";

export default function useTestNext15(authtoken: () => Promise<string | null>) {

    const { isLoading, data: testNext15, error } = useQuery({
        queryKey: ["testNext15"],
        queryFn: () => getTestsNext15(authtoken),
    });

    return { isLoading, testNext15, error };
}