import { useAuth } from "@clerk/clerk-react";
import useTest from "./hooks/useTest";
import Spinner from "../../components/Spinner";

function TestPage() {
    const { getToken } = useAuth();

    const { isLoading, test: testObj } = useTest(getToken);
    if (isLoading) return <Spinner />;
    const { test } = testObj.data;

    return (
        <div>
            <h3>Test: {test._id}</h3>
            <h4>{test.name}</h4>
        </div>
    );
}

export default TestPage;
