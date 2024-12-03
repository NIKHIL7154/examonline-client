import { useState } from "react";
//import useTabStatus from "./hooks/useTabStatus";
import ExamPage from "./pages/testpage/ExamPage"
//import { useDisableContextMenu } from "./hooks/useDisableContextMenu";
//import { useSelectionDisable } from "./hooks/useSelectionDisable";

function DemoPage() {
  const [examStatus, setexamStatus] = useState("continue");
  //const tabStatus = useTabStatus();
  //useDisableContextMenu(); //disable right click on exam page
  //useSelectionDisable(); //disable text selection on exam page
  /* useEffect(() => {
    if (tabStatus === "false") {
      count--;
      if (count <= 0) {
        setexamStatus("cancelled");
      } else{
        setexamStatus("paused");
      }
      
    }
  }, [tabStatus]) */
  return (
    <>
      {/* <h2 className=''>A new thing is going to happen</h2> */}
      <div className="w-full flex relative">
        
        {(() => {
          switch (examStatus) {
            case "continue":
              return <ExamPage />;
            case "paused":
              return (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <h1 className="text-2xl">Your exam has been paused. This is last warning otherwise your exam will be cancelled</h1>
                  <button className="bg-gray-300 py-1 px-7 hover:bg-gray-400" onClick={() => setexamStatus("continue")}>Resume</button>
                </div>
              );
            case "cancelled":
              return (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <h1 className="text-2xl">Your exam has been cancelled.</h1>
                </div>
              );
            default:
              return null;
          }
        })()}
          
      </div>
    </>
  )
}

export default DemoPage
