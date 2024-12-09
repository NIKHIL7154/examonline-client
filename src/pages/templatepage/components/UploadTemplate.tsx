import { FiFileText } from "react-icons/fi";
import DragAndDropUpload from "./DragAndDropUpload";
import { PiMicrosoftExcelLogo } from "react-icons/pi"

interface UploadTemplateProps {
    expandUpload: boolean;
}

function UploadTemplate({ expandUpload }: UploadTemplateProps) {

    return (
        <div data-button={"upload-button"} className="w-[500px] p-6  border  flex flex-col gap-4">
            <small className="poppins-regular w-[40ch]">
                *Please download one of the Question format files from the options below.
            </small>

            <div className="  flex  flex-col justify-evenly gap-2 ">
                
                <button data-button="download-pdf" className=" border flex items-center p-2 rounded-lg gap-2 border-2 hover:border-green-500">
                    <PiMicrosoftExcelLogo className="text-4xl text-green-700" />
                    <h3 className="text-xl"> Download template.xlsx</h3>
                </button>

                <button data-button="download-txt" className=" border flex items-center p-2 rounded-lg gap-2 border-2 hover:border-gray-400">
                    <FiFileText className="text-4xl text-gray-500" />
                    <h3 className="text-xl "> Download template.txt</h3>
                </button>

            </div>

            { expandUpload && <DragAndDropUpload /> }

        </div>
    )
}

export default UploadTemplate;