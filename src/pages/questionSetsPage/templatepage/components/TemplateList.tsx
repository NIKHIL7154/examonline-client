import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom'
import UploadTemplate from "./UploadTemplate";
import { setQuestions } from "../../../../helpers/QuestionSetStore";
import AiGenerativeDialog from "./AiGenerativeDialog";


export type GenerativeAiState={
    state:boolean,
    template:string
}

function TemplateList() {
    const [expandOptions, setExpandOptions] = useState<boolean>(false);
    const [expandUpload, setExpandUpload] = useState<boolean>(false);
    const [genrateWithAiState, setgenrateWithAiState] = useState<GenerativeAiState>({state:false,template:""});

    const navigate = useNavigate();
    const templateDetails = [
        { label: "Aptitude", image: "https://www.shutterstock.com/image-vector/cognitive-ability-skill-think-process-600nw-2195232273.jpg" },
        { label: "English", image: "https://cdni.iconscout.com/illustration/premium/thumb/learn-english-language-online-illustration-download-in-svg-png-gif-file-formats--course-class-learning-education-pack-school-illustrations-4609639.png" },
        { label: "Reasoning", image: "https://blogassets.leverageedu.com/blog/wp-content/uploads/2019/12/31125604/Logical-Reasoning.png" },
        { label: "Computer Fundamentals", image: "https://img.freepik.com/free-vector/hand-drawn-microlearning-illustration_23-2150983108.jpg" }];


    const handleTemplateWindow = (e: React.MouseEvent<HTMLDivElement>) => {
        //alert("Template clicked");
        // const button = e.target.closest('button[data-button]');
        // const uploadBtn = e.target.closest('div[data-button]');
        const target = e.target as HTMLElement;
        const button = target.closest('button[data-button]') as HTMLButtonElement | null;
        const uploadBtn = target.closest('div[data-button]') as HTMLDivElement | null;

        if (button?.dataset.button === "create-set-button") {
            setExpandOptions((prevstate) => !prevstate);
            return;
        }


        if (button?.dataset.button === "download-pdf" || button?.dataset.button === "download-txt") {
            const anchor = document.createElement('a');
            anchor.href = '/files/examFusion.xlsx';
            anchor.download = 'examFusion_template.xlsx';
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor);
            setExpandUpload(true);
            return;
        }
        if (uploadBtn?.dataset.button === "upload-button") {
            return;
        }

        if (button?.dataset.button === "create-button") {
            setQuestions([]);
            navigate('/app/questions/create');
            return;
        }
        if(button?.dataset.button?.includes("template")){
            const template = button.dataset.button.split(" ")[1];
            setgenrateWithAiState({state:true,template});
        }

        setExpandOptions(false);


    }
 

    const createSetButton = (
        <li className="flex flex-col gap-3 ">
            <button data-button={"create-set-button"}>
                <div className={`
                ${expandOptions ? "border-green-500 border-2 text-7xl text-green-700" : "border-slate-300 text-green-900 text-8xl"} 
                h-[130px] w-[180px] border bg-white flex transition-[font] duration-100
                hover:text-green-700 hover:text-7xl hover:border-2 hover:border-green-500`}>
                    <IoMdAdd className=" m-auto " />
                </div>
            </button>
            <h3 className="poppins-regular text-[0.9rem] text-center">Blank set</h3>
        </li>

    );

    const renderedTemplates = templateDetails.map((el, i) => {
        return (
            <li className="flex flex-col gap-3 relative" key={i + 1}>
                <div
                    className="absolute top-[-1.5rem] w-full text-center font-bold bg-clip-text text-transparent animate-gradient bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 gradient-Text"
                    style={{
                        backgroundSize: '200% 200%',
                        animation: 'gradientShift 3s ease infinite',
                    }}
                >
                    Generate with AI
                </div>

                



                <button data-button={"template "+el.label}>
                    <div className="h-[130px] w-[180px] border border-slate-300 bg-white flex hover:border-2 hover:border-green-500">
                        <img className="w-full" src={el.image} alt="" />
                    </div>
                </button>
                <h3 className="poppins-regular text-[0.9rem] text-center">{el.label}</h3>
            </li>
        );
    });

    return (
        <div onClick={handleTemplateWindow} className=" h-auto p-[30px] flex flex-col justify-center items-center w-full">
            {genrateWithAiState.state &&<AiGenerativeDialog template={genrateWithAiState.template} effect={setgenrateWithAiState}/>}
            <div className="w-[1000px] h-full gap-4 flex flex-col overflow-hidden ">
                <h2 className="poppins-regular ">Start a new set</h2>
                <ul className=" h-full flex flex-row items-center gap-6 flex-wrap">
                    {createSetButton}

                    {renderedTemplates}
                </ul>

                {
                    expandOptions &&
                    <div className="w-full h-auto flex flex-row text-xl mt-2 bg-white relative ">
                        <UploadTemplate expandUpload={expandUpload} />


                        <span className="bg-white pb-1 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">or</span>

                        <button data-button={"create-button"} className="w-[500px] border hover:border-2 hover:border-lime-700 flex hover:text-2xl transition-[font] duration-150">
                            <p className="m-auto"> Create a set <br /> from scratch</p>
                        </button>
                    </div>
                }
            </div>
        </div>
    );
}

export default TemplateList