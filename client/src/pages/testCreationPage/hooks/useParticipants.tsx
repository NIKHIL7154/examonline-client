import { useQuery } from "@tanstack/react-query";
import { getParticipants } from "../../../services/apiParticipants";

export default function useParticipants(authtoken: () => Promise<string | null>) {
    const { isLoading, data: participants, error } = useQuery({
        queryKey: ["participants"],
        queryFn: () => getParticipants(authtoken) ,
        // queryFn: getQuestionSets as () => Promise<string | null>,
    });

    return { isLoading, participants, error };
}