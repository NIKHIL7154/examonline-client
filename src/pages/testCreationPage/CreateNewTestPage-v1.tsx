import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useTestConfig } from "./context/TestConfigContext";
// import QuestionSetSelector from "./components/QuestionSetSelector";
// import TestOptionForm from "./components/TestOptionForm";
// import TestParticipants from "./components/TestParticipants";

function CreateNewTestPage() {
    const { testConfig, isTestQuestionsEmpty, isTestSettingsEmpty, isTestParticipantsEmpty } = useTestConfig();
    const navigate = useNavigate();

    const testFormSteps = ["testQuestions", "testSettings", "testParticipants"];
    const location = useLocation();
    const currentRoute = location.pathname.split("/").at(-1)
    const currentFormStep = testFormSteps.indexOf(currentRoute);
    const prevFormStep = (currentFormStep - 1) <= 0 ? 0 : (currentFormStep - 1);
    const prevRoute = testFormSteps[prevFormStep];
    const nextFormStep = (currentFormStep + 1) >= 2 ? 2 : (currentFormStep + 1);
    const nextRoute = testFormSteps[nextFormStep];

    const currentPageFormStatus = (page) => {
        if (page === "testQuestions")
            return isTestQuestionsEmpty();

        else if (page === "testSettings")
            return isTestSettingsEmpty();

        else if (page === "testParticipants")
            return isTestParticipantsEmpty();

        return null;
    }

    const handleNextRoute = () => {
        if (currentRoute === "testParticipants"
            && isTestParticipantsEmpty()
            && isTestSettingsEmpty()
            && isTestQuestionsEmpty()
        ) {
            // form finish logic and api call goes here //
            console.log(testConfig);
            return;
        }

        if (currentPageFormStatus(currentRoute)) {
            navigate(nextRoute);
            return;
        }
        return;

    }


    const handlePrevRoute = () => {
        navigate(prevRoute);
    }

    return (
        <div className="w-full h-full overflow-y-auto overflow-x-hidden p-10">
            {/* <TestParticipants/> */}
            {/* <QuestionSetSelector/> */}
            {/* <TestOptionForm/> */}
            <Outlet />
            <div className="w-full flex justify-between mt-7">
                <button
                    disabled={currentFormStep === 0}
                    onClick={handlePrevRoute}
                    className="border px-3 py-1 disabled:text-red-300"
                >Prev
                </button>
                <button
                    disabled={!currentPageFormStatus(currentRoute)}
                    onClick={handleNextRoute}
                    className="border px-3 py-1 disabled:text-red-300"
                >
                    {currentFormStep === 2 ? "Submit" : "Next"}
                </button>
            </div>
        </div>
    );
}

export default CreateNewTestPage;
