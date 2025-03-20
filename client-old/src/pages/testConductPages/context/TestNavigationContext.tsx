import { createContext, useContext } from "react";
import { useState, ReactNode } from "react";

interface TestConductNavigationContextProps {
    currentStep: string;
    setCurrentStep: React.Dispatch<React.SetStateAction<TestSteps>>;
}
type TestSteps= "initial" | "environment" | "proctur" | "completed" | "expired";

const TestConductNavigationContext = createContext<TestConductNavigationContextProps | undefined>(undefined);

function TestNavigationProvider({ children }: { children: ReactNode }){
    const [currentStep, setCurrentStep] = useState<TestSteps>("initial");

    return (
        <TestConductNavigationContext.Provider value={{ currentStep, setCurrentStep }}>
            {children}
        </TestConductNavigationContext.Provider>
    );
};

function useTestNavigation() {
    const context = useContext(TestConductNavigationContext);
    if (context === undefined)
        throw new Error("Context was used outside provider");
    return context;
}

export { useTestNavigation, TestNavigationProvider };

