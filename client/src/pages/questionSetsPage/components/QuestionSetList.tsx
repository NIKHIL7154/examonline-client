import { useAuth } from "@clerk/clerk-react";
import useQuestionSets from "../hooks/useQuestionSets";
import { QuestionSet } from "../QuestionsPage";
import QuestionCard from "./QuestionCard";
import { motion } from 'framer-motion';

import SpinnerMini from "../../../components/SpinnerMini";

function QuestionSetList() {
    const { getToken } = useAuth();
    const { isLoading, questionSets } = useQuestionSets(getToken);

    if (isLoading) return <SpinnerMini className="text-[#91D794]" />

    const { totalSets, sets } = questionSets.data;
    if (totalSets === 0) return <span className="text-slate-400">Empty, Start by creating a new Question Set.</span>;

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0, y: 0 },
                visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.3, when: "beforeChildren" } }
            }}
            className="w-full flex-grow grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 lg:px-20"
        >
            {sets.map((set: QuestionSet) =>
                <QuestionCard key={set._id} item={set} />)
            }
        </motion.div>
    );
}

export default QuestionSetList;
