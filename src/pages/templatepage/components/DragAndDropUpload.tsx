import { useState, useRef } from 'react';
import { FiUpload } from "react-icons/fi";

const DragAndDropUpload = () => {
    const [files, setFiles] = useState([]);
    const inputRef = useRef(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles.length > 0) {
            setFiles(Array.from(droppedFiles));
        }
    };

    const uploadFiles = async () => {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append('files', file);
        });

        // UPLAOD LOGIC
        // try {
        //     const response = await fetch('http://localhost:5000/upload', { // Change to your server endpoint
        //         method: 'POST',
        //         body: formData,
        //     });

        //     if (response.ok) {
        //         console.log('Files uploaded successfully');
        //         setFiles([]); // Clear the files array after successful upload
        //     } else {
        //         console.error('File upload failed');
        //     }
        // } catch (error) {
        //     console.error('Error uploading files:', error);
        // }
    };

    return (
        <>
            <div
                className="drag-drop-area border cursor-pointer gap-[0] h-auto p-4 border border-2 border-dashed border-slate-300 hover:border-lime-700  flex justify-center items-center flex-col text-center "
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                {(files.length > 0) ? (
                    <div>
                        <h4>Selected Files:</h4>
                        <ul>
                            {files.map((file, index) => (
                                <li key={index}>{file.name}</li>
                            ))}
                        </ul>
                    </div>
                ) :
                    <>
                        <input
                            type="file"
                            ref={inputRef}
                            multiple
                            onChange={(e) => setFiles(Array.from(e.target.files))}
                            style={{ display: 'none' }}
                        />
                        <FiUpload className="text-gray-500 text-5xl mb-2" /> Drag and drop format file <br /> or

                        <button className="text-green-600 font-semibold"
                            onClick={() => inputRef.current.click()}>Browse</button>
                    </>
                }
                {/* {files.length > 0 && (
                    <div>
                        <h4>Selected Files:</h4>
                        <ul>
                            {files.map((file, index) => (
                                <li key={index}>{file.name}</li>
                            ))}
                        </ul>
                    </div>
                )} */}
            </div>
            <button className='border' onClick={uploadFiles} disabled={files.length === 0}>Upload Files</button>
        </>
    );
};

export default DragAndDropUpload;