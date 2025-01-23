
import { QuestionSet } from "../QuestionsPage"
import { motion } from "framer-motion"

type Props = {
    item: QuestionSet
}

const QuestionCard = (props: Props) => {
    const { name, id, questions } = props.item
    return (

        <motion.div
        
            variants={{ hidden: { opacity: 0, y: -50 }, visible: { opacity: 1, y: 0 ,transition:{
                duration:0.05
            }} }}
        className="group !w-[90%] h-72 relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm md:max-w-xl sm:rounded-lg sm:px-10">
            <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-sky-500 transition-all duration-300 group-hover:scale-[10]" />
            <div className="relative z-10 mx-auto max-w-md">
                <span className="grid h-20 w-20 place-items-center rounded-full bg-sky-500 transition-all duration-300 group-hover:bg-sky-400">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor" className="h-10 w-10 text-white transition-all">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 2.25h-9A2.25 2.25 0 005.25 4.5v15A2.25 2.25 0 007.5 21.75h9A2.25 2.25 0 0018.75 19.5v-15a2.25 2.25 0 00-2.25-2.25zM16.5 2.25v4.5h-4.5" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 10.5h7.5M8.25 13.5h7.5M8.25 16.5h4.5" />
                    </svg>

                </span>
                <div className="space-y-2 pt-5 text-base leading-1 text-gray-600 transition-all duration-300 group-hover:text-white">
                    <p>{name}</p>
                    <p className="text-sm ">Set ID: {id}</p>
                    <p className="text-sm">{questions} questions</p>
                </div>
                <div className="pt-5 text-base font-semibold leading-7">
                    <p>
                        <a href="#" className="text-sky-500 transition-all duration-300 group-hover:text-white">View Questions
                            →
                        </a>
                    </p>
                </div>
            </div>
        </motion.div>


    )
}

export default QuestionCard