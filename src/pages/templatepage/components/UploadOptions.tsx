import { FiFileText } from "react-icons/fi";
import DragAndDropUpload from "./DragAndDropUpload";
import { PiMicrosoftExcelLogo } from "react-icons/pi"

interface UploadOptionsProps {
    expandUpload: boolean;
}

function UploadOptions({ expandUpload }: UploadOptionsProps) {

    return (
        <div data-button={"upload-button"} className="w-[500px] p-6 border  flex flex-col gap-3">
            <small className="poppins-regular text-[0.95rem] w-[42ch] text-sm">
                *Please download one of the Question format files from the options below.
            </small>

            <div className="  flex  flex-col justify-evenly gap-2 ">
                
                <button data-button="download-pdf" className=" border flex items-center p-2 rounded-lg gap-2 border-2 hover:border-green-500">
                    <PiMicrosoftExcelLogo className="text-3xl text-green-700" />
                    <h3 className="text-lg"> Download template.xlsx</h3>
                </button>

                <button data-button="download-txt" className=" border flex items-center p-2 rounded-lg gap-2 border-2 hover:border-gray-400">
                    <FiFileText className="text-3xl text-gray-500" />
                    <h3 className="text-lg "> Download template.txt</h3>
                </button>

            </div>

            { expandUpload && <DragAndDropUpload /> }

        </div>
    )
}

export default UploadOptions;