import { FiUpload } from "react-icons/fi";
import { FaRegFilePdf } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";
import BrowseFileUploader from "./BrowseFileUploader";
import DragAndDropUpload from "./DragAndDropUpload";

function UploadTemplate({ expandUpload }) {

    return (
        <div data-button={"upload-button"} className="w-[500px] p-6  border  flex flex-col gap-4">
            <small className="poppins-regular w-[40ch]">
                *Please download one of the Question format files from the options below.
            </small>

            <div className="  flex  flex-col justify-evenly gap-2 ">
                <button data-button="download-pdf" className=" border flex items-center p-2 rounded-lg gap-2 border-2 hover:border-red-400">
                    <FaRegFilePdf className="text-4xl text-red-700" />
                    <h3 className="text-xl"> Download template.pdf</h3>
                </button>
                <button data-button="download-txt" className=" border flex items-center p-2 rounded-lg gap-2 border-2 hover:border-gray-400">
                    <FiFileText className="text-4xl text-gray-500" />
                    <h3 className="text-xl "> Download template.txt</h3>
                </button>
            </div>
            {
                expandUpload &&
                // <div className="cursor-pointer gap-[0] h-[180px] border border-2 border-dashed border-slate-300 hover:border-lime-700  flex justify-center items-center flex-col text-center ">
                //     <FiUpload className="text-gray-500 text-5xl mb-2" /> Drag and drop format file <br /> or
                //     <button className="text-green-600 font-semibold">Browse</button>
                // </div>
                <DragAndDropUpload/>
            }

        </div>
    )
}

export default UploadTemplate;