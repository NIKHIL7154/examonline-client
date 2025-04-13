import axios from "axios";
import { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { imageServer } from "../../utils/globals";
import { getExamData } from "../../utils/ExamData";

type Props={
    handleStepNavigation:(index:number)=>void,
}

const SelfiePage = (props:Props) => {
    const [hasPermissions, setHasPermissions] = useState<boolean>(false);
    const [isVideoStarted, setIsVideoStarted] = useState<boolean>(false);
    const [photo, setPhoto] = useState<string | null>(null);
    const [isPhotoTaken, setIsPhotoTaken] = useState<boolean>(false);
    const webcamRef = useRef<Webcam | null>(null);
    
    
    // const navigate = useNavigate();

    // Request Camera Permissions

    const getPermissions = async () => {
        try {
            await navigator.mediaDevices.getUserMedia({ video: true });
            setHasPermissions(true);
        } catch (err) {
            console.error("Permission denied:", err);
            setHasPermissions(false);
        }
    };
    useEffect(() => {
        const getPermissions = async () => {
            try {
                await navigator.mediaDevices.getUserMedia({ video: true });
                setHasPermissions(true);
            } catch (err) {
                console.error("Permission denied:", err);
                setHasPermissions(false);
            }
        };
        getPermissions();
    }, []);

    // Start Video Feed
    const startVideo = () => {
        setIsVideoStarted(true);
    };

    // Capture Photo
    const takePhoto = () => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            setPhoto(imageSrc);
            setIsPhotoTaken(true);
        }
    };

    // Retake Photo
    const retakePhoto = () => {
        setIsPhotoTaken(false);
        setPhoto(null);
    };

    // Confirm Photo and Navigate
    const confirmPhoto = async () => {
        if (photo) {
            
            // return;
            try {
                // http://localhost:8000/store?user_id=nikhlu
                const formData = new FormData();
                const byteString = atob(photo.split(",")[1]);
                const arrayBuffer = new ArrayBuffer(byteString.length);
                const uint8Array = new Uint8Array(arrayBuffer);
                for (let i = 0; i < byteString.length; i++) {
                    uint8Array[i] = byteString.charCodeAt(i);
                }
                const blob = new Blob([uint8Array], { type: "image/png" });
                formData.append("image", blob, "selfie.png");
                const userUID=getExamData()?.userUID;
                const response = await axios.post(imageServer+"/store?user_id="+userUID, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                if(response.status === 200) {
                    console.log("Photo uploaded successfully:", response.data);
                    props.handleStepNavigation(2);
                }else{
                    console.error("Error uploading photo:", response.statusText);
                    setPhoto(null);
                }
                
            } catch (error) {
                alert("Error uploading photo: Cant verify your face");
                console.log("Error uploading photo:", error);
                setPhoto(null);
            }
            // localStorage.setItem("capturedSelfie", photo); // Store photo in local storage
        }
    };

    return (
        <div className="flex  flex-col items-center justify-center  text-white">
            {/* Permission Request */}
            {!hasPermissions && (
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-4">Grant Camera Permission</h2>
                    <button
                        className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
                        onClick={getPermissions}
                    >
                        Request Permission
                    </button>
                </div>
            )}

            {/* Start Video */}
            {hasPermissions && !isVideoStarted && (
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-4">Camera Access Granted</h2>
                    <button
                        className="px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none"
                        onClick={startVideo}
                    >
                        Start Capturing Photo
                    </button>
                </div>
            )}

            {/* Video Stream */}
            {isVideoStarted && !isPhotoTaken && (
                <div className="text-center bg-white rounded-xl p-6 px-10 shadow-lg max-w-lg">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Take Selfie keeping your face in center</h2>
                    <div className="flexed relative overflow-hidden rounded-lg">
                        <Webcam ref={webcamRef} screenshotFormat="image/png" className="max-w-xs" />
                    </div>
                    <button
                        className="mt-4 px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none"
                        onClick={takePhoto}
                    >
                        Take Photo
                    </button>
                </div>
            )}

            {/* Photo Preview */}
            {isPhotoTaken && (
                <div className="text-center bg-white rounded-xl p-6 px-10 shadow-lg max-w-lg">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Photo Preview</h2>
                    <img src={photo!} alt="Captured" className="w-full max-w-md rounded-lg mb-4 shadow-md" />
                    <div className="flex justify-center gap-4">
                        <button
                            className="px-6 py-3 bg-yellow-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none"
                            onClick={retakePhoto}
                        >
                            Retake
                        </button>
                        <button
                            className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
                            onClick={confirmPhoto}
                        >
                            Confirm & Proceed
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SelfiePage;
