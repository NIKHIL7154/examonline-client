import { useAuth } from "@clerk/clerk-react";
import useTest from "./hooks/useTest";
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";
import TestDataBox from "./components/testView/TestDataBox";

function TestPage() {
    const { getToken } = useAuth();
    const navigate = useNavigate();

    const { isLoading, test: testObj } = useTest(getToken);
    if (isLoading) return <Spinner />;
    const { test } = testObj.data;

    return (
        <div className="border min-h-screen p-10 space-y-10">
            <div className="flex justify-between poppins-regular">
                <div className="flex items-center gap-5">
                    <h2 className="text-[1.8rem]">Test #{test._id}</h2>
                    <span className="font-medium px-3 py-1 rounded-full text-sm bg-red-100 text-red-500">
                        {test.status}
                    </span>
                </div>

                <button
                    className="text-green-600 hover:text-green-500 "
                    onClick={() => navigate(-1)}
                >
                    &larr; Back</button>

            </div>
            <TestDataBox test={test} />

            <div className="flex justify-end poppins-regular gap-4">
                {
                    test.status === "pending" &&
                    <button className=" hover:bg-emerald-700 py-3 px-4 text-[0.9rem] rounded-md text-white bg-emerald-600">Make Test Live</button>
                }
                <button className="hover:bg-red-800 py-3 px-4 text-[0.9rem] rounded-md text-white bg-red-700">Delete Test</button>
                <button onClick={() => navigate(-1)} className="hover:bg-slate-100 border border-slate-300 py-2 px-3 rounded-md text-[0.9rem]">Back</button>
            </div>
        </div>
    );
}

export default TestPage;
