import { useState, useRef } from 'react';
import { FiUpload } from "react-icons/fi";

const DragAndDropUpload = () => {
    const [file, setFile] = useState<File | null>(null); // sets file for question extraction
    const [isDragging, setIsDragging] = useState<boolean>(false); // for styling div 

    const inputRef = useRef<HTMLInputElement | null>(null); // stores ref to input field

    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        handleDrag(e);
        setIsDragging(true); // Set dragging state
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        handleDrag(e);
        setIsDragging(false); // Reset dragging state when leaving the drop zone
    };

    const validateFile = (file: File) => {
        const allowedTypes = ['text/plain', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']; // MIME types for .txt and .xlsx
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
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target?.result;
            console.log('File content:', content);
        };
        reader.onerror = () => {
            console.error('Error reading file:', file.name);
        };
        reader.readAsText(file);
    };

    return (
        <>
            <div
                className={`
                    ${isDragging ? "border-lime-700 text-gray-500" : "border-slate-300 "}  
                border cursor-pointer gap-[0] h-auto p-4 border-2 border-dashed flex justify-center items-center flex-col text-center
                hover:border-lime-700 transition-all duration-200`}
                onDragEnter={handleDrag}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    ref={inputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />

                {/* I file exists show file else show upload options: Drag or Browse */}
                {file ? (
                    <div className='flex flex-col gap-2'>
                        <h3>Selected file: <strong className='font-semibold'>{file.name} </strong></h3>
                        <button className="text-green-600 font-semibold hover:text-lime-500"
                            onClick={() => inputRef.current?.click()}>Choose another</button>
                    </div>
                ) : (
                    <>
                        <FiUpload className="text-gray-500 text-5xl mb-1" />
                        Drag and drop a .txt or .xlsx file <br /> or
                        <button className="text-green-600 font-semibold hover:text-lime-500"
                            onClick={() => inputRef.current?.click()}>Browse</button>
                    </>
                )}
            </div>

            {/* If file does not exists, dont show upload button */}
            {file &&
                <button
                    className='rounded-lg border p-2 bg-green-600 text-white hover:bg-green-500'
                    onClick={uploadFile}>
                    Upload File
                </button>
            }
        </>
    );
};

export default DragAndDropUpload;