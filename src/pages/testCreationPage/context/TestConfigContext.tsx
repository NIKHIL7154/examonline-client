import React, { createContext, ReactNode, useContext, useState } from "react";

interface TestConfig {
    testQuestions: number[];
    testSettings: {
        startDate: Date | undefined,
        endDate: Date | undefined,
        proctureOption: string,
    };
    testParticipants: File | undefined;
}

interface TestConfigContextType {
    testConfig: {
        testQuestions: number[];
        testSettings: {
            startDate: Date | undefined;
            endDate: Date | undefined;
            proctureOption: string;
        };
        testParticipants: File | undefined;
    };
    setTestConfig: React.Dispatch<React.SetStateAction<TestConfig>>;
    isTestSettingsEmpty: () => void;
    isTestQuestionsEmpty: () => void;
    isTestParticipantsEmpty: () => void;
}

const initialState: TestConfig = {
    testQuestions: [],
    testSettings: {
        startDate: undefined,
        endDate: undefined,
        proctureOption: "",
    },
    testParticipants: undefined,
};

// Create a default value for the context
// const defaultTestConfigContextValue: TestConfigContextType = {
//     testQuestions: [],
//     setTestQuestions: () => { }, // Default function does nothing
// };

// Create the context
// const TestConfigContext = createContext<TestConfigContextType>(defaultTestConfigContextValue);
const TestConfigContext = createContext<TestConfigContextType | undefined>(undefined);

// Create the provider component
function TestConfigProvider({ children }: { children: ReactNode }) {

    // const [testQuestions, setTestQuestions] = useState<number[]>([]);
    const [testConfig, setTestConfig] = useState<TestConfig>(initialState);
    const {testSettings: {startDate, endDate, proctureOption}, testQuestions, testParticipants} = testConfig;

    const isTestSettingsEmpty = () => !!(startDate && endDate && proctureOption);
    const isTestQuestionsEmpty = () => testQuestions.length > 0
    const isTestParticipantsEmpty = () => !!(testParticipants)

    return (
        <TestConfigContext.Provider value={{ testConfig, setTestConfig, isTestQuestionsEmpty, isTestSettingsEmpty, isTestParticipantsEmpty }}>
            {children}
        </TestConfigContext.Provider>
    );
}

function useTestConfig() {
    const context = useContext(TestConfigContext);
    if (context === undefined)
        throw new Error("Context was used outside provider");
    return context;
}

export { TestConfigProvider, useTestConfig };