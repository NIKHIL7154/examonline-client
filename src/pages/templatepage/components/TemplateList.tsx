import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom'
import UploadTemplate from "./UploadTemplate";

function TemplateList() {
    const [expandOptions, setExpandOptions] = useState<boolean>(false);
    const [expandUpload, setExpandUpload] = useState<boolean>(false);

    const navigate = useNavigate();
    const templateDetails = [
        { label: "Template 1", image: "" },
        { label: "Template 2", image: "" },
        { label: "Template 3", image: "" },
        { label: "Template 4", image: "" }];


    const handleTemplateWindow = (e: React.MouseEvent<HTMLDivElement>) => {

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
            setExpandUpload(true);
            return;
        }
        if (uploadBtn?.dataset.button === "upload-button") {
            return;
        }

        if (button?.dataset.button === "create-button") {
            navigate('/app/edit-set');
            return;
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
            <h3 className="poppins-regular text-[0.9rem]">Blank set</h3>
        </li>

    );

    const renderedTemplates = templateDetails.map((el, i) => {
        return (
            <li className="flex flex-col gap-3" key={i + 1}>
                <button>
                    <div className="h-[130px] w-[180px] border border-slate-300 bg-white flex hover:border-2 hover:border-green-500">
                        {el.image}
                    </div>
                </button>
                <h3 className="poppins-regular text-[0.9rem]">{el.label}</h3>
            </li>
        );
    });

    return (
        <div onClick={handleTemplateWindow} className=" h-auto p-[30px] flex flex-col justify-center items-center bg-gray-100 w-full">
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