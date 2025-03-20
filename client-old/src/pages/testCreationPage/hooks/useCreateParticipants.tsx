import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addParticipant } from "../../../services/apiParticipants";

type ParticipantType = {
    name: string;
    email: string;
}
type ParticipantListType = {
    listName: string;
    list: ParticipantType[];
}

export default function useCreateParticipants (authtoken: () => Promise<string | null>)  {

    const queryClient = useQueryClient();
    
    const { isPending: isCreating, mutate: createParticipants } = useMutation({
        mutationFn: (payload:ParticipantListType) => addParticipant(authtoken, payload),
        onSuccess: () => {
            toast.dismiss();
            toast.success("Participants successfully added");
            queryClient.invalidateQueries({
                queryKey: ["participants"],
            });
            // reset();
        },
        onError: (err) => toast.error(err.message),
    });
    return { isCreating, createParticipants}
}