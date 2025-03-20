import React, { createContext, ReactNode, useContext, useState } from "react";

interface TestConfig {
    testQuestions: number[];
    testSettings: {
        startAt: Date | undefined,
        endAt: Date | undefined,
        procturing: string,
        resumable: string,
        duration: number,
        tabSwitchLimit: string,
    };
    testParticipants: string[];
}

interface TestConfigContextType {
    testConfig: TestConfig;
    setTestConfig: React.Dispatch<React.SetStateAction<TestConfig>>;
    isTestSettingsEmpty: () => void;
    isTestQuestionsEmpty: () => void;
    isTestParticipantsEmpty: () => void;
}

const initialState: TestConfig = {
    testQuestions: [],
    testSettings: {
        startAt: undefined,
        endAt: undefined,
        procturing: "",
        resumable: "",
        duration: 0,
        tabSwitchLimit: "-1",
    },
    testParticipants: [],
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
    const {testSettings: {startAt, endAt, procturing, resumable,duration,tabSwitchLimit}, testQuestions, testParticipants} = testConfig;

    // const isTestSettingsEmpty = () => !!(startAt && endAt && procturing && resumable && duration>0 && parseInt(tabSwitchLimit)> -1 && tabSwitchLimit!="");
    const isTestSettingsEmpty = () => false
    // const isTestQuestionsEmpty = () => testQuestions.length > 0
    const isTestQuestionsEmpty = () => false
    const isTestParticipantsEmpty = () => false

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