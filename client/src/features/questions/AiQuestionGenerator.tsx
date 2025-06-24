import { useAuth } from "@clerk/clerk-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { templateDetails } from "../../utils/templateQuestions";
import { createPostRequest } from "../authentication/apiHelper";
import { setQuestions } from "../../utils/QuestionSetStore";
import { Question } from "../../types/QuestionTypes";
import ParticlesButton from "../../ui/ParticlesButton";
import { serverUrl } from "../../utils/globals";

type Props = {
    templateIndex: number
    goBack: () => void
}

const AiQuestionGenerator = ({ templateIndex, goBack }: Props) => {

    const { label, questions } = templateDetails[templateIndex]
    const [curQuestion, setcurQuestion] = useState<Question>(questions[0]);
    const navigate = useNavigate();
    const { getToken } = useAuth()



    const [genOptions, setgenOptions] = useState({
        level: 1,
        numQuestions: 0,
        template: label
    });
    const handleGenerate = async () => {
        if (genOptions.numQuestions < 1 || genOptions.numQuestions > 100) {
            toast.error("Please enter number of questions between 1 and 100")
            return
        }
        toast.loading("Generating questions")
        try {
            const payload = {
                difficulty: genOptions.level,
                count: genOptions.numQuestions,
                topic: genOptions.template
            }
            const response = await createPostRequest(getToken, serverUrl+"/questionGen", payload)
            const { data: { questions } } = response
            toast.dismiss()
            toast.success("Questions generated successfully")
            setQuestions(questions)
            navigate("/app/questions/edit")
        } catch (error) {
            toast.dismiss()
            toast.error("Error occured while generating questions, Error : " + error)
        }
    }

    return (

        <div className=' w-[50vw] h-full justify-center flex flex-col bg-white '>

            {/* Heading and back button */}
            <div className='w-full h-[10%] flex relative justify-between items-center p-4 border-b border-slate-300'>
                <h2 className='text-xl w-full text-center'>Generate {label} questions</h2>
                <button onClick={goBack} className='text-red-500 border rounded-3xl p-1 px-2 absolute right-5 top-4 cursor-pointer'>Change Template</button>
            </div>

            {/* Level and number of questions input */}
            <div className="flexed w-full my-4">
                <div className='w-1/2  h-[10%]   p-4'>
                    <label htmlFor='level' className='text-lg mr-4'>Select Level:</label>

                    <select id='level' onChange={(e) => {
                        setcurQuestion(questions[parseInt(e.target.value) - 1])
                        setgenOptions({ ...genOptions, level: parseInt(e.target.value) })
                    }

                    } className='w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'>
                        {Array.from({ length: 10 }, (_, i) => (
                            <option key={i} value={i + 1}>{`Level ${i + 1}`}</option>
                        ))}
                    </select>
                </div>
                <div className='w-1/2 h-[10%]  p-4'>
                    <label htmlFor='numQuestions' className='text-lg mr-4'>Number of Questions to Generate:</label>
                    <input
                        type='number'
                        min='1'
                        max='100'
                        onChange={(e) => {
                            setgenOptions({ ...genOptions, numQuestions: parseInt(e.target.value) })
                        }}
                        className='w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder='Enter number of questions 1 - 100'
                    />
                </div>
            </div>



            {/* Example question */}
            <div className='w-full mt-3  p-4 flex flex-col justify-center items-center'>
                <p className="text-gray-400">Note:- Generated questions will be similar to below example</p>
                <h6 className='text-2xl mb-4 mt-8'>{curQuestion.questionTitle}</h6>
                <div className='w-full grid grid-cols-2 gap-4 px-10'>
                    {Object.entries(curQuestion.options).map(([key, value]) => (
                        <p key={key} className='w-full p-4 border border-gray-300 rounded-lg shadow-sm'>
                            {key}: {value}
                        </p>
                    ))}
                </div>

            </div>
            <div className="w-full mt-4 flexed ">

                <ParticlesButton onClick={handleGenerate} themecolor="black" text="Generate Questions" />
            </div>



        </div>

    )
}

export default AiQuestionGenerator
