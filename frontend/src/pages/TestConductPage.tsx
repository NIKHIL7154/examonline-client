import { useState } from "react";
import { useTestNavigation } from "../features/testConduct/TestNavigationContext";
import TestInitialPage from "../features/testConduct/TestInitialPage";
import SystemCheck from "../features/testConduct/SystemCheck";
import ProcturPage from "../features/testConduct/ProcturPage";
import TestCompleted from "../features/testConduct/TestCompleted";
import TestExpired from "../features/testConduct/TestExpired";





type TestSteps= "initial" | "environment" | "proctur" | "completed" | "expired";
const TestConductPage = () => {
  const { currentStep, setCurrentStep } = useTestNavigation();
  const [testToken, setTestToken] = useState<string>("alba");
  const updateToken=(token:string)=>{
    setTestToken(token);
  }
  return (
    <div className="w-full h-full relative">
      <select name="state" className="absolute left-0 top-0" onChange={(e)=>setCurrentStep(e.target.value as TestSteps)} id="">
        <option value="initial">Initial</option>
        <option value="environment">Environment</option>
        <option value="testing">Testing</option>
        <option value="proctur">Proctur</option>
        <option value="completed">Completed</option>
        <option value="expired">Expired</option>
      </select>
      {currentStep === "initial" && <TestInitialPage updateToken={updateToken}/>}
      {currentStep === "environment" && <SystemCheck/>}
      
      {currentStep === "testing" && <div>
        <input onChange={(e)=>setTestToken(e.target.value)} type="text" placeholder="Enter id here" />
        <button onClick={() => setCurrentStep("proctur")}>Submit
        </button>
      </div>}
      {currentStep === "proctur" && <ProcturPage testToken={testToken} />}
      {currentStep==="completed" && <TestCompleted/>}

      {currentStep==="expired" && <TestExpired/>}

      
    </div>
  )
}

export default TestConductPage