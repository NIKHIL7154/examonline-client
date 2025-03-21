import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useParams } from "react-router";
import { getActivateTest } from "../../services/apiTests";
import toast from "react-hot-toast";
import { simulateOutsideClick } from "../../utils/globals";

export default function useActivateTest(authtoken: () => Promise<string | null>) {
    const queryClient = useQueryClient();
    const { isPending: isSending, mutate: activateTest } = useMutation({
        
        mutationFn: (testId: string) => getActivateTest(authtoken, testId as string),
        onSuccess: () => {
            toast.success("Test link is being forwarded to participants. Please check back with us later!");
            queryClient.invalidateQueries({
                queryKey: ["tests"], // Invalidate cache if needed
            });
            simulateOutsideClick();
            // navigate(0);
            // setTimeout(() => {
            //     window.location.reload();
            // }, 1000);
        },
        onError: (err) => toast.error(err.message),
    });

    return { isSending, activateTest };
}