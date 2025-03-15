import { Outlet } from "react-router"
import AnimatedTimeline from "../../features/testCreation/StepsTimeline"
import { TestDetailsProvider } from "../../features/testCreation/TestDetailsContext"
import TestProgressManager from "../../features/testCreation/TestProgressManager"

const TestCreation = () => {
  return (
    <div className="w-full flex flex-col items-center  h-full">
    <AnimatedTimeline/>
    <div className="w-full flex-grow">
      <TestDetailsProvider>

      <Outlet />
      <TestProgressManager/>
      </TestDetailsProvider>
    </div>
    </div>
  )
}

export default TestCreation