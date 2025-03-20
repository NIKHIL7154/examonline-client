import { useNavigate } from "react-router";
import Row from "../ui/Row";
import Tag from "../ui/Tag";
import { FaArrowLeft } from "react-icons/fa";
import { useAuth } from "@clerk/clerk-react";
import useTest from "../features/tests/useTest";
import TestDataBox from "../features/tests/TestDataBox";
import TestLoading from "../features/tests/TestLoading";

function TestPage() {
    const { getToken } = useAuth();
    const navigate = useNavigate();

    const { isLoading, test: testObj } = useTest(getToken);
    if (isLoading) return <TestLoading/>
    const { test } = testObj.data;
    const isStale = test.status === "stale";

    // const { testId } = useParams();
    return (
        <>
            <Row type="horizontal">
                <span className="flex gap-6 items-center">
                    <h1 className={`text-3xl font-medium text-gray-800 ${isStale && "opacity-60"}`}>Test #{test._id}</h1>
                    <Tag size="lg" type={test.status} />
                </span>

                <button
                    onClick={() => navigate(-1)}
                    className="border border-gray-300 focus:outline-none bg-gray-50 h-[38px] hover:bg-gray-100 focus:ring-[0.2rem] focus:ring-gray-300 cursor-pointer text-[0.95rem] rounded-lg flex gap-2 font-normal pl-3 pr-3 items-center"
                >
                    <FaArrowLeft className="text-sm text-gray-500" />
                    <span className="text-gray-700"> Back</span>
                </button>
            </Row>

            <TestDataBox test={test} isStale={isStale} />

            
        </>
    );
}

export default TestPage;
