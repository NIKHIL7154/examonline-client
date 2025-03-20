import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteTest as deleteTestApi } from "../../services/apiTests";

export function useDeleteTest(authtoken: () => Promise<string | null>) {

    const queryClient = useQueryClient();

    const { isPending: isDeleting, mutate: deleteTest } = useMutation({
        mutationFn: (id: string) => deleteTestApi(authtoken, id),
        onSuccess: () => {
            toast.success("Test was successfully deleted");
            queryClient.invalidateQueries({
                queryKey: ["tests"],
            });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isDeleting, deleteTest }
}