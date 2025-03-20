import { useAuth } from "@clerk/clerk-react";
import Menus from "../../ui/Menus";
import TestRow from "./TestRow";
import TestsLoading from "./TestsLoading";
import useTests from "./useTests";

const data = [
    {
        _id: "67b993108e1ca35da449d5e6",
        name: "Testing using auth-1",
        status: "completed",
        createdAt: new Date(Date.now()),
        durationInSec: 3600,
        proctoring: true,
        tabSwitchLimit: 1,
        resumable: true,
        participants: 20,
        linksForwarded: "forwarded",
    },
    {
        _id: "67b993108e1Bd35da449d5e9",
        name: "Testing using auth-2",
        status: "pending",
        createdAt: new Date(Date.now()),
        durationInSec: 3600,
        proctoring: true,
        tabSwitchLimit: 1,
        resumable: true,
        participants: 20,
        linksForwarded: "forwarded",
    },
    {
        _id: "67b123108e1Bd35da449d5e9",
        name: "General Knowledge",
        status: "active",
        createdAt: new Date(Date.now()),
        durationInSec: 3600,
        proctoring: true,
        tabSwitchLimit: 1,
        resumable: true,
        participants: 20,
        linksForwarded: "forwarded",
    },
]

function TestSpawner() {
    const { getToken } = useAuth();
    const { isLoading, tests } = useTests(getToken)

    if (isLoading) return (<TestsLoading />)
    const { tests: testsArr, totalTests } = tests.data;

    if (totalTests === 0) return <div > Tests is Empty</div>


    return (
        <Menus>
            <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-300">
                {testsArr.map((test) => {
                    return <TestRow key={test._id} testItem={test} />
                })}
            </div>
        </Menus>
    );
}

export default TestSpawner;
