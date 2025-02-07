import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useTestConfig } from "./context/TestConfigContext";
import { useEffect, useState } from "react";

function CreateNewTestPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { testConfig, isTestQuestionsEmpty, isTestSettingsEmpty, isTestParticipantsEmpty } = useTestConfig();
    const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);

    const ROUTES = {
        TEST_QUESTIONS: "testQuestions",
        TEST_SETTINGS: "testSettings",
        TEST_PARTICIPANTS: "testParticipants",
    };

    const testFormSteps = [ROUTES.TEST_QUESTIONS, ROUTES.TEST_SETTINGS, ROUTES.TEST_PARTICIPANTS];
    // const testFormSteps = ["testQuestions", "testSettings", "testParticipants"];

    const getNextRoute = (currentStep) => {
        return currentStep < testFormSteps.length - 1 ? testFormSteps[currentStep + 1] : null;
    };

    const getPrevRoute = (currentStep) => {
        return currentStep > 0 ? testFormSteps[currentStep - 1] : null;
    };

    const currentRoute = location.pathname.split("/").at(-1)
    const currentFormStep = testFormSteps.indexOf(currentRoute);

    const nextRoute = getNextRoute(currentFormStep);
    const prevRoute = getPrevRoute(currentFormStep);

    const formStatusCheck = {
        [ROUTES.TEST_QUESTIONS]: isTestQuestionsEmpty,
        [ROUTES.TEST_SETTINGS]: isTestSettingsEmpty,
        [ROUTES.TEST_PARTICIPANTS]: isTestParticipantsEmpty,
    };

    useEffect(() => {
        const checkFormStatus = () => {
            if (currentRoute === ROUTES.TEST_PARTICIPANTS) {
                // Check if any of the forms are empty
                setIsNextButtonDisabled(
                    !isTestParticipantsEmpty() || !isTestSettingsEmpty() || !isTestQuestionsEmpty()
                );
            } else {
                // For other pages, check the current page form status
                setIsNextButtonDisabled(!currentPageFormStatus(currentRoute));
            }
        };

        checkFormStatus();
    }, [currentRoute, isTestQuestionsEmpty, isTestSettingsEmpty, isTestParticipantsEmpty]);


    const currentPageFormStatus = (page) => {
        return formStatusCheck[page] ? formStatusCheck[page]() : null;
    };

    useEffect(() => {
        if (currentRoute === ROUTES.TEST_SETTINGS && !isTestQuestionsEmpty())
            navigate("testQuestions", { replace: true })

        if (currentRoute === ROUTES.TEST_PARTICIPANTS && (!isTestQuestionsEmpty() || !isTestSettingsEmpty()))
            navigate("testQuestions", { replace: true })


    }, [isTestQuestionsEmpty, navigate, ROUTES, currentRoute]);

    const handleNextRoute = () => {
        if (currentRoute === ROUTES.TEST_PARTICIPANTS) {
            // Check if any of the forms are empty
            if (!isTestParticipantsEmpty() || !isTestSettingsEmpty() || !isTestQuestionsEmpty()) {
                // Handle form validation error
                console.error("Please fill out all fields before submitting.");
                return;
            }
            // Form submission logic
            console.log(testConfig);
            return;
        }

        // Check if the current page form is valid before navigating to the next step
        if (currentPageFormStatus(currentRoute)) {
            navigate(nextRoute);
        } else {
            console.error("Please complete the current form before proceeding.");
        }
    };

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
                    disabled={isNextButtonDisabled}
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
