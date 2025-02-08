// import { useState } from "react";
import { useRef } from "react";
import { FiUpload } from "react-icons/fi";
import { GrDocumentDownload } from "react-icons/gr";
import { useTestConfig } from "../context/TestConfigContext";

function TestParticipants() {
    const { testConfig, setTestConfig } = useTestConfig();
    const { testParticipants } = testConfig;

    // const [file, setFile] = useState<File | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);;

    // console.log(testParticipants);

    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const validateFile = (file: File) => {
        const allowedTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
        if (allowedTypes.includes(file.type)) {
            // setFile(file);
            setTestConfig(cur => {
                return {
                    ...cur,
                    testParticipants: file
                }
            })
        } else {
            alert('Please upload a .xlsx file.');
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
    const handleDownload = () => {
        const anchor = document.createElement('a');
        anchor.href = '/files/testParticipants.xlsx';
        anchor.download = 'test-partipants.xlsx';
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        return;
    }

    return (
        <div>
            <h2 className="text-[1.7rem] font-semibold mb-4">
                Add Participants
            </h2>

            <div className="flex gap-8 items-center mb-8">
                <h3 className="text-xl">
                    Upload information using template file:
                </h3>
                <button onClick={handleDownload} className="group hover:border-green-500 hover:bg-green-500 text-xl border-2 border-gray-500 px-3 py-2 rounded-md flex items-center gap-2">
                    <GrDocumentDownload className="group-hover:text-white" />
                    <span className="group-hover:text-white">test-participants.xlsx</span>
                </button>
            </div>

            {/* Drag & Drop upload */}
            <div
                className="w-[90%] rounded-lg cursor-pointer gap-[0] h-[300px] p-4 border-2 border-dashed border-slate-300 hover:border-lime-700 flex justify-center items-center flex-col text-center"
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

                {testParticipants ? (
                    <div className='flex flex-col gap-2'>
                        <h3>Selected file: <strong className='font-semibold'>{testParticipants.name} </strong></h3>
                        <button className="text-green-600 font-semibold hover:text-lime-500"
                            onClick={() => inputRef.current?.click()}>Choose another</button>
                    </div>
                ) : (
                    <>
                        <FiUpload className="text-gray-500 text-5xl mb-3" />
                        <span className="text-lg">Drag and drop updated test-participants.xlsx <br /> or</span>
                        <button className="text-green-600 font-semibold hover:text-lime-500 text-lg"
                            onClick={() => inputRef.current?.click()}>Browse for: test-participants.xlsx </button>
                    </>
                )}
            </div>
            {/* {file && <button className='rounded-lg border p-2 bg-green-600 text-white hover:bg-green-500' onClick={uploadFile}>Upload File</button>} */}
        </div>
    );
}

export default TestParticipants;
