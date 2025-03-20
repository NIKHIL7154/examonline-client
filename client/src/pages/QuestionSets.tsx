import SetSpawner from "../features/questions/SetSpawner";
import SetsViewOperations from "../features/questions/SetsViewOperations";
import Row from "../ui/Row";

function QuestionSets() {
    return (
        <>
            <Row type="horizontal">
                <h1 className="text-3xl font-medium">My Question Sets</h1>
                <SetsViewOperations/>
            </Row>
            <SetSpawner/>
        </>
    );
}

export default QuestionSets;
