import { useRef, useState } from 'react';

const BrowseFileUploader = () => {
    const hiddenFileInput = useRef(null);
    const [fileName, setFileName] = useState('');

    const handleClick = () => {
        hiddenFileInput.current.click();
    };

    const handleChange = (event) => {
        const fileUploaded = event.target.files[0];
        if (fileUploaded) {
            setFileName(fileUploaded.name);
        }
    };

    return (
        <>
            <button className=" button-upload text-green-600 font-semibold" onClick={handleClick}>
                Browse
            </button>
            <input 
                type="file"
                onChange={handleChange}
                ref={hiddenFileInput}
                style={{ display: 'none' }}
            />
            {fileName && <p>Selected file: {fileName}</p>}
        </>
    );
};

export default BrowseFileUploader;