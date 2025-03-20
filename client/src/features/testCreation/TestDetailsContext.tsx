import { createContext, useContext, useState } from "react";

type TestDetails={
    testName:string,
    testSets:string[],
    testSettings:{
        startAt:Date|null,
        endAt:Date|null,
        duration:number|null,
        tabSwitchLimit:number|null,
        proctoringLevel:"Basic"|"Advanced"| null,
        resumeable:"true"|"false"|null,
    },
    participants:string[],
}
const initialState:TestDetails={
    testName:"",
    testSets:[],
    testSettings:{
        startAt:null,
        endAt:null,
        duration:null,
        tabSwitchLimit:null,
        proctoringLevel:null,
        resumeable:null,
    },
    participants:[],
}

type TestDetailsContextType={
    testDetails:TestDetails,
    setTestDetails:React.Dispatch<React.SetStateAction<TestDetails>>
}

const TestDetailsContext=createContext<TestDetailsContextType|undefined>(undefined)

const useTestDetails=()=>{
    const context=useContext(TestDetailsContext)
    if(!context){
        throw new Error("useTestDetails must be used within TestDetailsProvider")
    }
    return context
}

const TestDetailsProvider=({children}:{children:React.ReactNode})=>{
    const [testDetails, setTestDetails] = useState<TestDetails>(initialState);

    


    return <TestDetailsContext.Provider value={{ testDetails, setTestDetails }}>
        {children}
    </TestDetailsContext.Provider>
}

export {TestDetailsProvider,useTestDetails}