import { useState } from "react";
import { templateDetails } from "../../utils/templateQuestions";
import AiQuestionGenerator from "./AiQuestionGenerator";









const AITemplates = () => {
    const [selectedTemplate, setselectedTemplate] = useState<number | null>(null);
    const goBack=()=>{
        setselectedTemplate(null)
    }
    const templateCard = templateDetails.map((el, i) => {
        return (
            <div onClick={() => setselectedTemplate(i)} className="flex flex-col gap-3 relative" key={i + 1}>

                <div className="h-[150px] w-full border border-slate-300 bg-white flex hover:border-2 hover:border-green-500">
                    <img className="w-full h-full" src={el.image} alt={el.label} />
                </div>

                <h3 className="poppins-regular w-full text-[0.9rem] text-center">{el.label}</h3>
            </div>
        );
    });
    if (selectedTemplate==null) {
        return (
            <div className="w-[60vw] ">
                <h4 className="m-0 text-center">Select template to create Question Set</h4>
                <div className="w-auto grid grid-cols-4 gap-8 mt-4 p-4">
                    {templateCard}
                </div>
            </div>)
    }

    return <AiQuestionGenerator goBack={goBack} templateIndex={selectedTemplate}/>


}



export default AITemplates