import { useTestDetails } from "./TestDetailsContext"

const TestName = () => {
    const {testDetails, setTestDetails } = useTestDetails();
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTestDetails((prev) => {
            return {
                ...prev,
                testName: e.target.value
            }
        })
    }
    return (
        <div className="w-full h-full flex flex-col items-center justify-center  p-4 rounded-lg ">
            <p className="text-xl">Start by entering the name of your Test</p>
            <input
                onChange={handleNameChange}
                value={testDetails.testName}
                className="border w-1/3 p-2 text-xl my-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter test name"
                type="text"
            />
            
        </div>
    )
}

export default TestName
