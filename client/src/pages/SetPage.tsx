import { useAuth } from "@clerk/clerk-react";
import useQuestionSet from "../features/questions/useQuestionSet";
import Row from "../ui/Row";
import { useNavigate } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import SetLoading from "../features/questions/SetLoading";

function SetPage() {
    const { getToken } = useAuth();
    const { isLoading, questionSet } = useQuestionSet(getToken);
    const navigate = useNavigate();

    if (isLoading) return <SetLoading/>;
    // if (isLoading) return <div> Loading</div>;
    const { set } = questionSet.data;
    const { _id: setId, name, questions } = set;
    return (
        <>
            <Row type="horizontal">
                <span className="flex gap-6 items-center">
                    <h1 className="text-3xl font-medium text-gray-800">Set #{setId}</h1>
                </span>
                <button
                    onClick={() => navigate(-1)}
                    className="border border-gray-300 focus:outline-none bg-gray-50 h-[38px] hover:bg-gray-100 focus:ring-[0.2rem] focus:ring-gray-300 cursor-pointer text-[0.95rem] rounded-lg flex gap-2 font-normal pl-3 pr-3 items-center"
                >
                    <FaArrowLeft className="text-sm text-gray-500" />
                    <span className="text-gray-700"> Back</span>
                </button>
            </Row>

            <div className="w-230 mx-auto">
                <div className="space-y-4">
                    <div className=" border-gray-300 border px-7 py-6 rounded-lg bg-gray-50 space-y-3">
                        <h2 className="block text-xl font-medium text-gray-600 ">
                            Set Name
                        </h2>
                        <p className="bg-gray-50 text-gray-600 font-medium py-2 w-full transition-all duration-200 border-b border-transparent outline-none"
                        >
                            {name}
                        </p>
                    </div>

                    {questions.map((field:any, index: number) => (
                        <div
                            key={index}
                            className="bg-gray-50 border border-gray-300 rounded-lg px-7 py-7 relative"
                        >
                            <div className="mb-4 space-y-2">
                                <Row type="horizontal">
                                    <h3 className="block text-lg font-medium text-gray-600">
                                        Question {index + 1}
                                    </h3>
                                </Row>
                                <p className="placeholder:text-gray-400 focus:placeholder-transparent w-full poppins-medium transition-all duration-200 text-gray-600 py-2 border-b border-transparent  bg-gray-50 focus-visible:outline-0 box-border">
                                    {field.questionTitle}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg">
                                {Object.keys(field.options).map((key) => (
                                    <div key={key}>
                                        <h4 className="block text-sm font-medium text-gray-600 mb-1">
                                            Option {key}
                                        </h4>
                                        <p title={field.options[key]} className="truncate placeholder:text-gray-400 w-100 poppins-medium transition-all duration-200 text-gray-600 py-2 border-b border-transparent  bg-gray-50 focus-visible:outline-0 box-border">
                                            {field.options[key]}
                                        </p>

                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 space-y-2">
                                <h4 className="block text-sm font-medium text-gray-600 ">
                                    Correct Answer
                                </h4>
                                <p className="w-full text-gray-600 font-medium  transition-all duration-200 border cursor-pointer outline-none  border-transparent p-2 rounded-md">
                                    Option {field.correctOption}
                                </p>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </>

    );
}

export default SetPage;
