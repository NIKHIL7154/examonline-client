import { useState } from "react"
import GenerateButton from "./GenerateButton";
import { GenerativeAiState } from "./TemplateList";
import { aptitudeMCQs, computerFundamentalsMCQs, englishMCQs, reasoningMCQs } from "./templatequestions";

export type Question = {
    question: string;
    options: {
        A: string;
        B: string;
        C: string;
        D: string;
    };
    answer: string;
    
};

type Props = {
    template:string,
    effect:React.Dispatch<React.SetStateAction<GenerativeAiState>>
}
type DemoQuestionsObject={
    [key:string]:Question[]
}
const demoQuestionsArray:DemoQuestionsObject={
    Aptitude:aptitudeMCQs,
    Reasoning:reasoningMCQs,
    English:englishMCQs,
    Computer:computerFundamentalsMCQs
}


const AiGenerativeDialog = (props: Props) => {
    const ques:Question[] = demoQuestionsArray[props.template]
    const [curQuestion, setcurQuestion] = useState(ques[0]);
    const generationOptions={
        level:0,
        numQuestions:0,
        template:props.template
    }
    const handleGenerate = () => {
        if(generationOptions.numQuestions<1 || generationOptions.numQuestions>100){
            alert("Please enter number of questions between 1 and 100")
            return
        }
        alert(`Generating ${generationOptions.numQuestions} questions of level ${generationOptions.level} for ${props.template}`)
        //api call to generate questions
        //and navigate to question maker page
        
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
                    setcurQuestion(ques[parseInt(e.target.value)])
                    generationOptions.level=parseInt(e.target.value)+1
                }
                } className='w-1/3 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'>
                    {Array.from({ length: 10 }, (_, i) => (
                        <option key={i} value={i}>{`Level ${i + 1}`}</option>
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
                            generationOptions.numQuestions=parseInt(e.target.value)
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