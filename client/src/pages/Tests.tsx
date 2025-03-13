import Row from "../ui/Row";
import TestsViewOperations from "../features/tests/TestsViewOperations";
import TestSpawner from "../features/tests/TestSpawner";

function Tests() {
    return (
        <>
            <Row type="horizontal">
                <h1 className="text-3xl font-medium">My Tests</h1>
                <TestsViewOperations/>
            </Row>
            <TestSpawner />
        </>
    );
}

export default Tests;
