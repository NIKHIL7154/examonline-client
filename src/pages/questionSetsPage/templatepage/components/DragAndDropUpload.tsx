import { useState, useRef } from 'react';
import { FiUpload } from "react-icons/fi";
import * as XLSX from "xlsx";
import { genUID } from '../../../../helpers/gens';
import { setQuestions } from '../../../../helpers/QuestionSetStore';
import { useNavigate } from 'react-router-dom';
const DragAndDropUpload = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState<File | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);;

    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const validateFile = (file: File) => {
        const allowedTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']; // MIME types for .txt and .xlsx
        if (allowedTypes.includes(file.type)) {
            setFile(file);
        } else {
            alert('Please upload a .txt or .xlsx file.');
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles.length > 0) {
            const selectedFile = droppedFiles[0];
            validateFile(selectedFile);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            validateFile(selectedFile);
        }
    };

    const uploadFile = async () => {
        if (file) {
            const reader = new FileReader();
      
            reader.onload = (e) => {
              const data = e.target?.result;
              if (data) {
                // Read the binary string
                const workbook = XLSX.read(data, { type: "binary" });
                const sheetName = workbook.SheetNames[0]; // Get the first sheet
                const sheet = workbook.Sheets[sheetName]; // Get sheet data
                const json = XLSX.utils.sheet_to_json(sheet); // Convert sheet to JSON
                const questions = json.map((q: any) => {
                    return {
                        question: q.Question,
                        options: {
                        A: q.A,
                        B: q.B,
                        C: q.C,
                        D: q.D,
                        },
                        answer: q.Answer,
                        id: genUID(6),
                    };
                    });
                setQuestions(questions);
                navigate("/app/questions/create")
                 // Update state
              }
            };
      
            reader.readAsBinaryString(file);
          }
    };

    return (
        <>
            <div
                className="cursor-pointer gap-[0] h-auto p-4 border-2 border-dashed border-slate-300 hover:border-lime-700 flex justify-center items-center flex-col text-center"
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
                
                {file ? (
                    <div className='flex flex-col gap-2'>
                        <h3>Selected file: <strong className='font-semibold'>{file.name} </strong></h3>
                        <button className="text-green-600 font-semibold hover:text-lime-500"
                            onClick={() => inputRef.current?.click()}>Choose another</button>
                    </div>
                ) : (
                    <>
                        <FiUpload className="text-gray-500 text-5xl mb-2" /> Drag and drop a .txt or .xlsx file <br /> or
                        <button className="text-green-600 font-semibold hover:text-lime-500"
                            onClick={() => inputRef.current?.click()}>Browse</button>
                    </>
                )}
            </div>
            {file && <button className='rounded-lg border p-2 bg-green-600 text-white hover:bg-green-500' onClick={uploadFile}>Upload File</button>}
        </>
    );
};

export default DragAndDropUpload;