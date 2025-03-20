// import { CheckCircle2 } from "lucide-react"
import { useEffect } from "react";
import SelfiePage from "../../SelfiePage";


type Steps = {
    name: string;
    index: number;
    completed: boolean;
}

type Props = {
    activeStep: Steps;
    methods: {
        handleStepCompletion: (index: number, completed: boolean) => void;
        handleStepNavigation: (index: number) => void;
    }
}





export default function MainContent(props: Props) {
    const activeStep = props.activeStep;
    const components = [
        <div className="">
            {activeStep.completed ?
                <><img className="w-[50%] mx-auto" src="https://finshiksha.com/wp-content/themes/finshiksha/assets/images/success.gif" alt="" />
                    <p className="text-center">Your system has been verified.</p></>
                : <><img className="w-[70%] mx-auto" src="https://cdni.iconscout.com/illustration/premium/thumb/otp-verification-illustration-download-in-svg-png-gif-file-formats--2-factor-authentication-email-password-security-identity-pack-crime-illustrations-4309037.png" alt="" />
                    <p className="text-center">Please wait while we verify your system</p></>
            }

        </div>,

        <div className="p-4">
            <h3 className="text-lg font-medium text-gray-800">Environment Setup Instructions</h3>
            <ul className="list-disc list-inside mt-2 text-gray-700">
                <li>Close all unnecessary tabs and windows to ensure optimal performance.</li>
                <li>Ensure your internet connection is stable.</li>
                <li>Disable any VPN or proxy services.</li>
                <li>Make sure your webcam and microphone are working properly.</li>
                <li>Allow necessary permissions for the browser to access your webcam and microphone.</li>
                <li>Ensure you are in a quiet and well-lit environment.</li>
                <li>Have your ID ready for verification purposes.</li>
            </ul>
            <div className="mt-4">
                <label className="flex items-center">
                    <input onChange={(e) => {
                        if (e.target.checked) {
                            props.methods.handleStepCompletion(activeStep.index, true)
                        } else {
                            props.methods.handleStepCompletion(activeStep.index, false)
                        }
                    }
                    } type="checkbox" className=" h-5 w-5 text-green-600" />
                    <span className="ml-2 text-gray-700">I have read all the instructions carefully and understand that my exam may be canceled if I do not follow them.</span>
                </label>
            </div>
        </div>,
        <SelfiePage handleStepNavigation={props.methods.handleStepNavigation}/>,
        <div className="text-center">
            
            <h3 className="text-lg font-medium text-gray-800">Ready to Start Your Exam</h3>
            <p className="mt-2 text-gray-700">Please make sure you have followed all the instructions and are ready to begin.</p>
            <div className="text-center">
            <p className="text-red-600">Once the test is started, you cannot pause or leave it.</p>
            </div>
            <button onClick={() => {
            props.methods.handleStepNavigation(activeStep.index)
            }} className="mt-4 bg-green-500 text-white px-4 py-2 rounded mx-auto">
            Start Exam
            </button>
        </div>
    ]
    useEffect(() => {
        setTimeout(() => {
            console.log("Completed")
            props.methods.handleStepCompletion(activeStep.index, true)
        }, 3000)
        return () => {

        };
    }, []);


    return (
        <div className="flex-1 p-6 ">
            <div className="rounded-lg border flex flex-col justify-between h-[100%] border-gray-400 overflow-hidden">
                <div className="mb-8 w-full bg-[#E8FFE8] p-4">
                    <h2 className="text-xl font-medium text-gray-800">{activeStep?.name}</h2>

                </div>

                <div className="flex items-center justify-center">
                    <div className="flex items-center gap-2 text-lg">
                        {/* <CheckCircle2 className="h-6 w-6 text-[#4CD964]" /> */}
                        <span>{components[activeStep.index]}</span>

                    </div>
                </div>

                <div className="flex justify-end p-4">
                    {/* <Button variant="outline">Previous</Button> */}
                    {activeStep.index < 2 && <button onClick={() => {
                        props.methods.handleStepNavigation(activeStep.index)
                    }} disabled={!activeStep.completed} className={`text-base px-4 py-2 ${activeStep.completed ? "bg-green-500" : "bg-slate-500"}  text-white rounded `}>Continue</button>}
                </div>
            </div>
        </div>
    )
}

