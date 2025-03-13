// import SetsViewOperations from "../features/questions/SetsViewOperations";
import { FaArrowLeft } from "react-icons/fa";
import Row from "../ui/Row";
import { useNavigate } from "react-router";
import SetEditorForm from "../features/questions/SetEditorForm";

function SetEditorPage() {
    const navigate = useNavigate();
    return (
        <>
            <Row type="horizontal">
                <h1 className="text-3xl font-medium">Set Editor</h1>
                {/* <SetsViewOperations/> */}
                <button
                    onClick={() => navigate(-1)}
                    className="border border-gray-300 focus:outline-none bg-gray-50 h-[38px] hover:bg-gray-100 focus:ring-[0.2rem] focus:ring-gray-300 cursor-pointer text-[0.95rem] rounded-lg flex gap-2 font-normal pl-3 pr-3 items-center"
                >

                <FaArrowLeft className="text-sm text-gray-500" />
                    <span className="text-gray-700"> Back</span>
                </button>
            </Row>

            <SetEditorForm/>
        </>
    );
}

export default SetEditorPage;
