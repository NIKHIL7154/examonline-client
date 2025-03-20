import { FiDownload } from "react-icons/fi";
import FileUpload from "../../ui/FileUpload";

const handleClick = () => {
    const anchor = document.createElement('a');
    anchor.href = '/files/examFusion.xlsx';
    anchor.download = 'examFusion_template.xlsx';
    document.body.querySelector(".styled-modal")?.appendChild(anchor);
    anchor.click();
    document.body.querySelector(".styled-modal")?.removeChild(anchor);
    return;
}

function UploadSet() {
    return (
        <div className="w-110 space-y-5 poppins-regular">
            <p className="space-y-2">
                <button onClick={handleClick} className="border border-gray-300 group hover:bg-gray-200 cursor-pointer transition-all duration-200 text-gray-600 px-4 py-2 rounded-md flex gap-2 items-center">
                    <FiDownload className="text-md group-hover:translate-y-[2px] group-hover:text-emerald-600 transition-all duration-200" />
                    <span className="text-[0.9rem] font-medium ">Template File </span>
                </button>
                <small className="text-[0.9rem]">Download and modify the Template file to upload your questions. </small>
            </p>

            <FileUpload />
        </div>
    );
}

export default UploadSet;
