import { useAuth } from "@clerk/clerk-react";
import { FiShieldOff } from "react-icons/fi";
import { FiShield } from "react-icons/fi";
// import useTests from "../tests/useTests";
import useTestNext15 from "./useTestNext15";
import { format, parseISO } from "date-fns";
import { useNavigate } from "react-router";

interface testInfoType {
    _id: string,
    name: string,
    status: string,
    startAt: string,
    // startAt: Date,
    proctoring: boolean,
}

interface Props {
    testInfo: testInfoType
}

const TestRow = ({ testInfo }: Props) => {
    const navigate = useNavigate();
    const { _id: testId, name, startAt, proctoring } = testInfo;
    return (
        <div title={name} className="cursor-pointer w-full h-10 p-2 flex items-center justify-between">
            {/* <p className="flex items-center gap-4"> */}
            <span className="w-60 text-[15px] flex items-center gap-1.5">
                <span className={`rounded-full size-6 flex items-center justify-center ${proctoring ? "bg-[#a9d8aa5b] text-emerald-700" : "bg-[#b4b1ef59] text-purple-600"}`}>
                    {proctoring ? <FiShield /> : <FiShieldOff />}</span>
                <span>{name}</span>
            </span>
            <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full flex gap-1 text-sm items-center justify-center">
                {/* {proctoring ? <FiShield /> : <FiShieldOff />} */}
                <span>pending</span>
            </span>
            {/* </p> */}
            <span className="text-sm text-gray-500">Activate before {format(parseISO(startAt), "d MMM ")}</span>
            {/* <span className="text-sm text-gray-500">Activate before 25 Jan 12:00pm</span> */}
            <button
                onClick={() => navigate(`/app/tests/${testId}`)}
                className="text-sm cursor-pointer bg-gray-100 px-2 py-1.5 hover:bg-gray-200 rounded-md">
                view
            </button>
        </div>
    )
}

function RecentTests() {
    const { getToken } = useAuth();
    const { isLoading, testNext15 } = useTestNext15(getToken)

    const emptyTests = <div className="text-gray-500 text-[15px] w-full flex items-center justify-center h-30">No tests scheduled for next few days  </div>


    if (isLoading) return <div>Loading</div>
    let allTests;

    // console.log(testNext15);
    if (!testNext15?.data?.tests?.length) allTests = <div className="text-gray-500 text-[15px] w-full flex items-center justify-center h-30">Tests could not be loaded  </div>
    const { tests: testsArr, totalTests } = testNext15;

    if (!totalTests) allTests = emptyTests

    if (totalTests)
        allTests = testsArr.map((test: testInfoType) => {
            return <TestRow key={test._id} testInfo={test} />
        })



    return (
        <div className="bg-gray-50 h-72 col-span-2 rounded-2xl p-6 flex flex-col gap-1">
            <h5 className="text-[15px] mb-2">Upcomming tests</h5>
            <div className="flex-1 flex-col space-y-1 overflow-y-auto rounded-xl scrollbar-hide divide-y divide-gray-200">
                {
                    allTests
                }
            </div>
        </div>
    );
}

export default RecentTests;
