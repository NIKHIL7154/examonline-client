import { Outlet } from "react-router";
import AnimatedTimeline from "../features/testCreation/StepsTimeline";
import { TestDetailsProvider } from "../features/testCreation/TestDetailsContext";
import TestProgressManager from "../features/testCreation/TestProgressManager";

const TestCreation = () => {
  

  return (
    <div className="w-full flex flex-col items-center ">
      <AnimatedTimeline />

      <div className="w-full mt-8 pb-12 flexed min-h-[420px] relative bg-white  rounded-lg shadow-lg overflow-x-hidden">
        <TestDetailsProvider>
            <Outlet />

          <TestProgressManager />
        </TestDetailsProvider>
      </div>
    </div>
  );
};

export default TestCreation;