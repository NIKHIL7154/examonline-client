import { QuestionSet } from "../QuestionsPage"
import { motion } from "framer-motion"

type Props = { item: QuestionSet }

const QuestionCard = ({ item: { name, id, questions } }: Props) => (
    <motion.div
        variants={{
            hidden: { opacity: 0, y: -50 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.05 } }
        }}
        className="group w-[90%] border-2 border-neutral-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-all"
    >
        <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 border-2 border-neutral-300 rounded-full grid place-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-neutral-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 2.25h-9A2.25 2.25 0 005.25 4.5v15A2.25 2.25 0 007.5 21.75h9A2.25 2.25 0 0018.75 19.5v-15a2.25 2.25 0 00-2.25-2.25zM16.5 2.25v4.5h-4.5" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 10.5h7.5M8.25 13.5h7.5M8.25 16.5h4.5" />
                </svg>
            </div>
            <div className="flex-grow">
                <h3 className="text-lg font-semibold text-neutral-800">{name}</h3>
                <p className="text-neutral-500 text-sm">Set ID: {id}</p>
            </div>
        </div>
        <div className="border-t border-neutral-200 pt-4 flex justify-between items-center">
            <p className="text-neutral-600">{questions} Questions</p>
            <a href="#" className="text-neutral-800 font-medium hover:text-blue-600 transition-colors">
                View Set →
            </a>
        </div>
    </motion.div>
)

export default QuestionCard