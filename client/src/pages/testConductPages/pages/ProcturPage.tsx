import { useEffect, useRef, useState } from "react";
import ExamConductPage from "./ExamConductPage";

import { useFullScreenDetector } from "../../../hooks/useFullScreenDetector";
import useTabStatus from "../../../hooks/useTabStatus";
import { useSelectionDisable } from "../../../hooks/useSelectionDisable";
import useSocketConnectionStatus from "../../../hooks/useSocketConnectionStatus";
import { socket } from "../../../config/socket";
import { useQuestionStore } from "../components/QuestionStore";
import { useTestNavigation } from "../context/TestNavigationContext";
type Props = {
    testToken: string;
}

const ProcturPage = (props: Props) => {

    const { currentStep, setCurrentStep } = useTestNavigation();


    const isFullscreen = useFullScreenDetector();
    const divRef = useRef<HTMLDivElement>(null);
    const socketStatus = useSocketConnectionStatus();
    const [isTabActive, setIsTabActive] = useTabStatus(divRef, socketStatus) as [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    const { setQuestions } = useQuestionStore();
    const [testStarted, settestStarted] = useState<boolean>(true);
    useSelectionDisable(divRef, socketStatus);
    
/*     useEffect(() => {
        if (!isTabActive) {
            console.log("Tab switched");
            socket.emit("tab-switched");
        }
        return () => {

        }
    }, [isTabActive]);
 */

    useEffect(() => {
        function socketSetup() {
            // socket.auth = { token: "test-Token" };

            socket.auth = { token: props.testToken };
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
        }

        return () => {

        };
    }, [setQuestions]);

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
