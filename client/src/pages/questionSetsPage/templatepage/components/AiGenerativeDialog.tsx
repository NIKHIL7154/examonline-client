import { useState } from "react"
import GenerateButton from "./GenerateButton";
import { GenerativeAiState } from "./TemplateList";
import { aptitudeMCQs, computerFundamentalsMCQs, englishMCQs, reasoningMCQs } from "./templatequestions";
import { useNavigate } from "react-router-dom";
import { setQuestions } from "../../../../helpers/QuestionSetStore";
import { useAuth } from "@clerk/clerk-react";
import { createPostRequest } from "../../../../helpers/apiHelper";
import { set } from "date-fns";
import toast from "react-hot-toast";

export type Question = {
    question: string;
    options: {
        A: string;
        B: string;
        C: string;
        D: string;
    };
    answer: "A" | "B" | "C" | "D";
    id?: string;
};

type Props = {
    template:string,
    effect:React.Dispatch<React.SetStateAction<GenerativeAiState>>
}
type DemoQuestionsObject={
    [key:string]:Question[]
}
const demoQuestionsArray:DemoQuestionsObject={
    Aptitude:aptitudeMCQs as Question[],
    Reasoning:reasoningMCQs as Question[],
    English:englishMCQs as Question[],
    Computer:computerFundamentalsMCQs as Question[]
}



const AiGenerativeDialog = (props: Props) => {
    const ques:Question[] = demoQuestionsArray[props.template]
    const [curQuestion, setcurQuestion] = useState(ques[0]);
    const navigate = useNavigate();
    const {getToken} =useAuth()
    
    const closeDialog = () => {
        props.effect({state:false,template:""})
    }
    
    const [genOptions, setgenOptions] = useState({
        level:1,
        numQuestions:0,
        template:props.template
    });
    const handleGenerate =async () => {
    // const { difficulty, count, topic } = req.body;

        if(genOptions.numQuestions<1 || genOptions.numQuestions>100){
            toast.error("Please enter number of questions between 1 and 100")
            return
        }
        toast.loading("Generating questions")
        
        try {
            const payload={
                difficulty:genOptions.level,
                count:genOptions.numQuestions,
                topic:props.template
            }
            const response=await createPostRequest(getToken,"http://localhost:2121/api/v1/user/questionGen",payload)
            const {data:{questions}}=response
            toast.dismiss()
            toast.success("Questions generated successfully")
            setQuestions(questions)
            navigate("/app/questions/create")
        } catch (error) {
            toast.dismiss()
            toast.error("Error occured while generating questions, Error : "+error)
            closeDialog()
        }
        
        //api call to generate questions
        //and navigate to question maker page
        // const ques=aptitudeMCQs as Question[]
        
        // setQuestions(ques)
     
        
        
    }
    return (
        <div className='absolute top-0 right-0 z-10 w-[100vw] h-[100vh] flexed bg-[#0000002e]'>
            <div className='w-[70%] h-[80%] flex flex-col bg-white rounded-2xl shadow-2xl'>
                <div className='w-full h-[10%] flex relative justify-between items-center p-4 border-b border-slate-300'>
                    <h2 className='text-xl w-full text-center'>Generate {"name"} questions</h2>
                    <button onClick={()=>{
                        props.effect({state:false,template:""})
                    }} className='text-red-500 absolute right-5 top-4'>Close</button>
                </div>

                <div className='w-full h-[10%] flexed items-center p-4'>
                <label htmlFor='level' className='text-lg mr-4'>Select Level:</label>
                <select id='level' onChange={(e) => {
                    setcurQuestion(ques[parseInt(e.target.value)-1])
                    setgenOptions({...genOptions,level:parseInt(e.target.value)})
                }
                } className='w-1/3 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'>
                    {Array.from({ length: 10 }, (_, i) => (
                        <option key={i} value={i+1}>{`Level ${i + 1}`}</option>
                    ))}
                </select>
                </div>

                <div className='w-full h-[10%] flexed items-center p-4'>
                    <label htmlFor='numQuestions' className='text-lg mr-4'>Number of Questions to Generate:</label>
                    <input
                        type='number'
                        min='1'
                        max='100'
                        onChange={(e) => {
                            setgenOptions({...genOptions,numQuestions:parseInt(e.target.value)})
                        }}
                        className='w-1/3 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder='Enter number of questions 1 - 100'
                    />
                </div>
                    
                <div className='w-full mt-3  p-4 flex flex-col justify-center items-center'>
                <p className="text-gray-400">Note:- Generated questions will be similar to below example</p>
                    <h3 className='text-2xl mb-4 mt-8'>{curQuestion.question}</h3>
                    <div className='w-full grid grid-cols-2 gap-4 px-10'>
                        {Object.entries(curQuestion.options).map(([key, value]) => (
                            <p key={key} className='w-full p-4 border border-gray-300 rounded-lg shadow-sm'>
                                {key}: {value}
                            </p>
                        ))}
                    </div>
                    
                </div>
                <div className="w-full flexed flex-grow">

                <GenerateButton cb={handleGenerate}/>
                </div>

            

            
            </div>
        </div>



    )
}

export default AiGenerativeDialog