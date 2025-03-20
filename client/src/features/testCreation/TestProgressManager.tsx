import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useTestDetails } from "./TestDetailsContext";
import { createTest } from "../../services/apiTestCreation";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

const steps = ["/app/create/testName","/app/create/testSets", "/app/create/testSettings", "/app/create/testParticipants","/app/create/testReview"];


const TestProgressManager = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentIndex = steps.indexOf(location.pathname);
  const {testDetails}=useTestDetails();
  const [isNextEnabled, setisNextEnabled] = useState<boolean>(false);
  const {getToken}=useAuth();

  
  useEffect(() => {
    navigate(steps[0]);
  }, [navigate]);

  useEffect(() => {
    const validateTestSettings=()=>{
      const {duration,endAt,proctoringLevel,resumeable,startAt,tabSwitchLimit}=testDetails.testSettings;

      if(!duration || !endAt || !proctoringLevel || !resumeable || !startAt || !tabSwitchLimit ||  tabSwitchLimit<1 || duration<15|| proctoringLevel.length<1){
        return false;
      }
      
      //time verification
      const startAtDate=new Date(startAt);
      const endAtDate=new Date(endAt);
      if(startAtDate > endAtDate || startAtDate < new Date() || endAtDate < new Date() ){
        return false;
      }
      return  true;
      
    }
    switch (currentIndex) {
      case 0:
        setisNextEnabled(testDetails.testName !== "" && testDetails.testName.length >= 4);
        break;
      case 1:
        setisNextEnabled(testDetails.testSets.length > 0);
        break;
      case 2:
        setisNextEnabled(validateTestSettings());
        break;
      case 3:
        setisNextEnabled(testDetails.participants.length > 0);
        break;
      case 4:
        setisNextEnabled(true);
        break;
      default:
        setisNextEnabled(false);
        break;
    }
    
    

  }, [testDetails,currentIndex]);

  const handleNext =async () => {
    if (currentIndex < steps.length - 1) {
      navigate(steps[currentIndex + 1]);
    }
    if(currentIndex === steps.length - 1){
      toast.loading("Creating Test");
      try {
        const response=await createTest(getToken,testDetails);
        toast.dismiss()
        toast.success("Test Created Successfully");
        navigate("/app/tests");
        console.log(response);
      } catch (error) {
        toast.dismiss()
        toast.error(error as string);
        console.log(error);
      }
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      navigate(steps[currentIndex - 1]);
    }
  };

  
    return (
        
        <div className="navigation-buttons text-lg absolute w-full bottom-4 px-4 flex justify-between ">
          <button 
            onClick={handleBack} 
            disabled={currentIndex === 0} 
            className={`px-4 py-2 rounded-lg shadow-md transition-all duration-300 ${currentIndex === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-600 cursor-pointer hover:bg-black text-white'}`}
          >
            Back
          </button>

          <button 
            onClick={handleNext} 
            disabled={!isNextEnabled} 
            className={`px-4 py-2  rounded-lg shadow-md transition-all duration-300 ${isNextEnabled ? 'bg-green-500 cursor-pointer hover:bg-green-600 text-white' : 'bg-gray-300 cursor-not-allowed'}`}
          >
            {currentIndex === steps.length - 1 ? 'Create Test' : 'Next'}
          </button>
        </div>
        
    )
}

export default TestProgressManager