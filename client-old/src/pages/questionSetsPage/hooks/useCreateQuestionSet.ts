import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQuestionSet as createQuestionSetApi } from "../../../services/apiQuestionSets";
import toast from "react-hot-toast";

interface QuestionType {
    questionTitle: string;
    options: {
        A: string;
        B: string;
        C: string;
        D: string;
    },
    correctOption: string;
}

interface QuestionSetType {
    name: string;
    questions: QuestionType[];
}

export default function useCreateQuestionSet (authtoken: () => Promise<string | null>)  {

    const queryClient = useQueryClient();
    
    const { isPending: isCreating, mutate: createQuestionSet } = useMutation({
        mutationFn: (payload: QuestionSetType) => createQuestionSetApi(authtoken, payload),
        onSuccess: () => {
            toast.success("New Question Set successfully created");
            queryClient.invalidateQueries({
                queryKey: ["questionSets"],
            });
            // reset();
        },
        onError: (err) => toast.error(err.message),
    });
    return { isCreating, createQuestionSet}
}