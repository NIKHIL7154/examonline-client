import { RefObject, useEffect, useRef, useState } from "react";
import ExamConductPage from "./ExamConductPage";
import { useTestNavigation } from "./TestNavigationContext";
import { useFullScreenDetector } from "./hooks/useFullScreenDetector";
import useSocketConnectionStatus from "./hooks/useSocketConnectionStatus";
import useTabStatus from "./hooks/useTabStatus";
import { useQuestionStore } from "./components/QuestionStore";
import { useSelectionDisable } from "./hooks/useSelectionDisable";
import { socket } from "../../services/socket";
import axios from "axios";
import { getExamData } from "../../utils/ExamData";
import { SocketEvents } from "../../types/ExamConductTypes";



const ProcturPage = () => {

    const { setCurrentStep } = useTestNavigation();
    const { token, userUID } = getExamData();

    const isFullscreen = useFullScreenDetector();
    const divRef = useRef<HTMLDivElement>(null);
    const socketStatus = useSocketConnectionStatus();
    const [isTabActive, setIsTabActive] = useTabStatus(divRef as RefObject<HTMLDivElement>, socketStatus) as [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    const { setQuestions } = useQuestionStore();
    const [testStarted, settestStarted] = useState<boolean>(true);
    useSelectionDisable(divRef as RefObject<HTMLDivElement>, socketStatus);

    useEffect(() => {
        if (!isTabActive) {
            console.log("Tab switched");
            socket.emit(SocketEvents.TAB_SWITCH, { userUID });
        }
        return () => {

        }
    }, [isTabActive]);


    useEffect(() => {
        function socketSetup() {
            // socket.auth = { token: "test-Token" };

            socket.auth = { token: token };
            socket.connect();
            socket.on("startTest", (data) => {
                console.log("Test started", data)
                setQuestions(data);
                settestStarted(true);
            })
            socket.on("disconnect", () => {
                console.log("Disconnected from server")
                socket.disconnect();

            })
            socket.on("testCompleted", () => {
                console.log("Test completed")
                socket.disconnect();
                setCurrentStep("completed");
            })
            socket.on("proctoring", (data) => {
                console.log("Proctoring data received", data)
                if (data.message) {
                    alert(data.message);
                }
            })
        }

        socketSetup()



        return () => {
            socket.off("startTest");
            socket.off("disconnect");
            socket.off("testCompleted");
            socket.off("proctoring");
        };
    }, []);

    useEffect(() => {
        const captureImageAtRandomIntervals = () => {
            const videoElement = document.createElement("video");
            const canvasElement = document.createElement("canvas");
            const context = canvasElement.getContext("2d");

            navigator.mediaDevices.getUserMedia({ video: true })
                .then((stream) => {
                    videoElement.srcObject = stream;
                    videoElement.play();

                    const captureImage = async () => {
                        if (context) {
                            canvasElement.width = videoElement.videoWidth;
                            canvasElement.height = videoElement.videoHeight;
                            context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
                            const imageData = canvasElement.toDataURL("image/png");

                            try {
                                const formData = new FormData();
                                const byteString = atob(imageData.split(",")[1]);
                                const arrayBuffer = new ArrayBuffer(byteString.length);
                                const uint8Array = new Uint8Array(arrayBuffer);
                                for (let i = 0; i < byteString.length; i++) {
                                    uint8Array[i] = byteString.charCodeAt(i);
                                }
                                const blob = new Blob([uint8Array], { type: "image/png" });
                                formData.append("image", blob, "selfie.png");

                                const response = await axios.post(`http://localhost:8000/verify?user_id=${userUID}&socket_id=qwerty`, formData, {
                                    headers: {
                                        "Content-Type": "multipart/form-data",
                                    },
                                });
                                if (response.status === 200) {
                                    console.log("Photo uploaded successfully:", response.data);
                                } else {
                                    console.error("Error uploading photo:", response.statusText);
                                }
                            } catch (error) {
                                // alert("Error uploading photo: Can't verify your face");
                                console.log("Error uploading photo:", error);
                            }
                        }

                        const randomInterval = Math.floor(Math.random() * (15000 - 5000 + 1)) + 5000;
                        setTimeout(captureImage, randomInterval);
                    };

                    captureImage();
                })
                .catch((error) => {
                    console.error("Error accessing user media:", error);
                });
        };

        captureImageAtRandomIntervals();

    }, [])

    const enterFullscreen = () => {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else {
            console.log("Fullscreen API is not supported");
        }
    };
    if (!socketStatus) {
        return <div className="w-full h-full flexed">Please wait while create a secure connection to server</div>
    }



    return (
        <div ref={divRef} tabIndex={0} className="w-full h-full relative !cursor-default">

            {isFullscreen ? <div className="w-full h-full relative">
                {testStarted ? <ExamConductPage /> : <div className="w-full h-full flexed">Please wait while the test is being started</div>}



            </div>
                : <div className="w-full h-full flexed flex-col"><h4>You should be in full screen in order to attempt the test</h4>
                    <button tabIndex={-1} onClick={enterFullscreen} className="btn">Go Fullscreen</button>
                </div>}

            {
                isTabActive ? <></> : <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white p-4 rounded">
                    You are not allowed to switch tabs
                    <button className="btn" onClick={() => setIsTabActive(true)}>Continue</button>
                </div>
            }




        </div>
    );
};

export default ProcturPage;
