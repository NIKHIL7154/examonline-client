import { useAuth } from "@clerk/clerk-react";
import Menus from "../../ui/Menus";
import TestRow, { TestAll } from "./TestRow";
import TestsLoading from "./TestsLoading";
import useTests from "./useTests";
import Pagination from "../../ui/Pagination";
import Empty from "../../ui/Empty";

function TestSpawner() {
    const { getToken } = useAuth();
    const { isLoading, tests } = useTests(getToken)

    if (isLoading) return (<TestsLoading />)
    const { tests: testsArr, totalTests } = tests.data;
    // if(!bookings?.length)
    if (!testsArr?.length) return <Empty resourceName="tests"/>


    return (
        <>
            <Menus>
                <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-300">
                    {testsArr.map((test: TestAll) => {
                        return <TestRow key={test._id} testItem={test} />
                    })}
                </div>
            </Menus>

            <Pagination count={totalTests}/>
            {/* <div>hello</div> */}
        </>
    );
}

export default TestSpawner;
