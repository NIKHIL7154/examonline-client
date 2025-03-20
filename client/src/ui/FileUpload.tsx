import { useRef, useState } from "react";
import * as XLSX from "xlsx";
import toast from "react-hot-toast";

import { FiUpload } from "react-icons/fi";
import { PiMicrosoftExcelLogoBold } from "react-icons/pi";
import { FaCheck } from "react-icons/fa6";
import { HiOutlineRefresh } from "react-icons/hi";
import { setQuestions } from "../utils/QuestionSetStore";
import { isMoreThanOneFile, validateXlsxFile } from "../utils/fileOperations";
import { useNavigate } from "react-router";

function FileUpload() {
    
    const navigate = useNavigate();
    const [file, setFile] = useState<File | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };


    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const droppedFiles = e.dataTransfer.files;
        if (isMoreThanOneFile(droppedFiles.length))
            return toast.error("Max upload limit upto one file");

        if (droppedFiles.length > 0) {
            const selectedFile = droppedFiles[0];
            validateXlsxFile(selectedFile, setFile);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isMoreThanOneFile(e.target.files?.length))
            return toast.error("Max upload limit upto one file");

        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            validateXlsxFile(selectedFile, setFile);
        }
    };

    const uploadFile = async () => {
        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const data = new Uint8Array(e.target?.result as ArrayBuffer); // Convert to Uint8Array
                const binaryString = String.fromCharCode(...data); // Convert to binary string
                const workbook = XLSX.read(binaryString, { type: "binary" });
                const sheetName = workbook.SheetNames[0]; // Get the first sheet
                const sheet = workbook.Sheets[sheetName]; // Get sheet data
                const json = XLSX.utils.sheet_to_json(sheet); // Convert sheet to JSON

                const questions = json.map((q: any) => {
                    return {
                        questionTitle: q.Question,
                        options: {
                            A: q.A,
                            B: q.B,
                            C: q.C,
                            D: q.D,
                        },
                        correctOption: q.Answer,
                        // id: genUID(6),
                    };
                });
                setQuestions(questions);
                // navigate("/app/questions/edit"); // Update state
                navigate("edit"); // Update state

            };

            reader.readAsArrayBuffer(file);
        }
    }

    if (file)
        return <div className="flex justify-between items-center ">
            <div className="flex items-center gap-[0.4rem]">
                <PiMicrosoftExcelLogoBold className="text-emerald-700 text-[1.8rem]" />
                <span className="text-lg text-gray-700 w-75 truncate">
                    {file.name}
                </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
                <button
                    className="focus:outline-none p-2 group hover:bg-gray-100 rounded-full cursor-pointer transition-all duration-200"
                    onClick={() => setFile(null)}
                    title="Replace"
                >
                    <HiOutlineRefresh className="text-xl group-hover:text-gray-400" />
                </button>
                <button
                    className="focus:outline-none p-2 group hover:bg-gray-100 rounded-full cursor-pointer transition-all duration-200"
                    onClick={uploadFile}
                    title="Proceed"
                >
                    <FaCheck className="text-lg group-hover:text-emerald-500" />
                </button>
            </div>
        </div>

    return (
        <div className="poppins-regular text-gray-500 hover:bg-gray-100 cursor-pointer h-36 border-2 border-gray-300 border-dashed rounded-lg flex flex-col justify-center items-center gap-4"
            onClick={() => inputRef.current?.click()}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
        >
            <input
                type="file"
                ref={inputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />

            <FiUpload className="text-4xl text-gray-400" />
            <p className="text-[0.98rem] text-center">
                <span className="text-gray-900 ">Click to upload</span> or drag and drop
                <br /> XLSX up to 10MB
            </p>
        </div>

    );
}

export default FileUpload;
