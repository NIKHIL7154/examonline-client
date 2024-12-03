import { useEffect, useState } from 'react'
import TestsChecker from './components/testView/TestsChecker';
import TestSpawner from './components/testView/TestSpawner';
import CreateTestDialog from './components/CreateTestDialog';
export type TestObject = {
  testId: string,
  name: string,
  questionSetId: number,
  createdOn: string,
  status: string,

}

const TestsLayout = () => {
  const [testObjects, settestObjects] = useState<Array<TestObject>>([]);
  useEffect(() => {
    const tests = new Promise<Array<TestObject>>((resolve) => {
      setTimeout(() => {
        resolve([{
          testId: "XFGT",
          name: "Test 1",
          questionSetId: 101,

          createdOn: "2023-10-01",

          status: "Active",

        }])

      }, 1000)
    })
    tests.then((res: Array<TestObject>) => {
      if (!res || res.length === 0) {
        setTestPageState("noTests")
        return;
      }
      settestObjects(res);
      setTestPageState("viewTests")

    })
  }, [])

  const [testPageState, setTestPageState] = useState<"noTests" | "viewTests" | "createTests">("noTests");
  return (
    <div className='w-full h-full overflow-y-auto overflow-x-hidden flexed'>
      {/* <button onClick={()=>{
            setTestPageState(testPageState === "noTests" ? "viewTests" : "noTests")
        }}>Toggle state</button> */}
      {testPageState === "noTests" && <TestsChecker testNavigate={setTestPageState} />}
      {testPageState === "viewTests" && <TestSpawner testObjects={testObjects} testNavigate={setTestPageState} />}
      {testPageState === "createTests" && <CreateTestDialog />}
    </div>
  )
}

export default TestsLayout