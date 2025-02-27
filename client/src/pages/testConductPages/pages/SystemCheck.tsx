import Header from "../components/environment/Header"
import Sidebar from "../components/environment/Sidebar"
import MainContent from "../components/environment/MainContent"

import { useState } from "react";
import { useTestNavigation } from "../context/TestNavigationContext";

const initialSteps = [
    { name: "System Checks", index: 0, completed: false },
    { name: "Environment Setup", index: 1, completed: false },
    { name: "Take Photo", index: 2, completed: false },
    { name: "Start Exam", index: 3, completed: false }
];

type Steps = {
    name: string;
    index: number;
    completed: boolean;
}

export default function SystemCheck() {
    const {setCurrentStep}= useTestNavigation();
    const [activeStep, setActiveSteps] = useState<Steps>(initialSteps[0]);

    const handleStepClick = (index: number) => {
        setActiveSteps(initialSteps[index]);

    };
    const handleStepNavigation = (index: number) => {
        if (index < initialSteps.length - 1) {
            handleStepClick(index + 1)
        }else{
            alert("Test Completed")
            setCurrentStep("proctur")
        }
    }
    const handleStepCompletion = (index: number,completed:boolean) => {
        const updatedSteps = initialSteps.map((step, i) => 
            i === index ? { ...step, completed: completed } : step
        );
        setActiveSteps(updatedSteps[index]);

        initialSteps[index].completed = true;
    }


    return (
        <div className="flex w-full h-full flex-col overflow-y-auto">
            <Header />
            <div className="flex flex-1 flex-col md:flex-row">
                <Sidebar activeStep={activeStep} onStepClick={handleStepClick} />
                <MainContent activeStep={activeStep} methods={{handleStepCompletion,handleStepNavigation}}/>
            </div>
        </div>
    );
}