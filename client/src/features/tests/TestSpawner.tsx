import { useAuth } from "@clerk/clerk-react";
import Menus from "../../ui/Menus";
import TestRow, { TestAll } from "./TestRow";
import TestsLoading from "./TestsLoading";
import useTests from "./useTests";

function TestSpawner() {
    const { getToken } = useAuth();
    const { isLoading, tests } = useTests(getToken)

    if (isLoading) return (<TestsLoading />)
    const { tests: testsArr, totalTests } = tests.data;

    if (totalTests === 0) return <div className="m-auto text-gray-500 font-normal">My Tests is empty.</div>


    return (
        <Menus>
            <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-300">
                {testsArr.map((test: TestAll) => {
                    return <TestRow key={test._id} testItem={test} />
                })}
            </div>
        </Menus>
    );
}

export default TestSpawner;
