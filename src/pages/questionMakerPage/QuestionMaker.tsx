import { useState } from "react";
import TextAreaComponent from "./component/TextAreaComponent";
import { genUID } from "../../helpers/gens";
import { getQuestions } from "../../helpers/variables";

type Props = {};



type Question = {
    question: string;
    options: {
        A: string;
        B: string;
        C: string;
        D: string;
    };
    answer: "A" | "B" | "C" | "D";
    id: string;
};

const QuestionMaker = (props: Props) => {
    

    const [curQuestion, setCurQuestion] = useState<number>(0);
    
    const [questions, setQuestions] = useState<Question[]>(getQuestions());

    const handleNextQuestion = () => {
        if (curQuestion < questions.length - 1) {
            setCurQuestion(curQuestion + 1);
        }
    };

    const handlePrevQuestion = () => {
        if (curQuestion > 0) {
            setCurQuestion(curQuestion - 1);
        }
    };

    const handleAddNewQuestion = () => {
        setQuestions([
            ...questions,
            {
                question: "",
                options: {
                    A: "",
                    B: "",
                    C: "",
                    D: "",
                },
                answer: "A",
                id: genUID(6),
            },
        ]);
        setCurQuestion(questions.length); // Navigate to the new question
    };

    const handleDeleteQuestion = (index: number) => {
        if (questions.length > 1) {
            const updatedQuestions = questions.filter((_, i) => i !== index);
            setQuestions(updatedQuestions);
            setCurQuestion((prev) => (prev >= updatedQuestions.length ? prev - 1 : prev));
        } else {
            alert("Cannot delete the last question!");
        }
    };

    const handleUpdateQuestion = (field: keyof Question, value: string) => {
        const updatedQuestions = [...questions];
        updatedQuestions[curQuestion] = {
            ...updatedQuestions[curQuestion],
            [field]: value,
        };
        setQuestions(updatedQuestions);
    };

    const handleUpdateOption = (optionKey: keyof Question["options"], value: string) => {
        const updatedQuestions = [...questions];
        updatedQuestions[curQuestion].options = {
            ...updatedQuestions[curQuestion].options,
            [optionKey]: value,
        };
        setQuestions(updatedQuestions);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-gray-100 to-gray-200">
            <div className="w-full bg-white shadow-lg rounded-lg p-8 flex gap-8 h-full">
                {/* Left Section - Question Editor */}
                <div className="w-2/3">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-bold">Question {curQuestion + 1} of {questions.length}</h1>
                        <button
                            onClick={() => handleDeleteQuestion(curQuestion)}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                        >
                            Delete
                        </button>
                    </div>
                    <div className="space-y-4 h-[80%] overflow-y-auto p-2">
                        <div className="font-bold">
                            <label className="block text-sm text-gray-700">
                                Question
                            </label>
                            <TextAreaComponent effect={(e) =>
                                handleUpdateQuestion("question", e.target.value)}
                                value={questions[curQuestion].question}
                                placeholder="Enter your question here"
                            />

                        </div>
                        {Object.entries(questions[curQuestion].options).map(
                            ([key, value]) => (
                                <div key={key}>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Option {key}
                                    </label>
                                    <TextAreaComponent effect={(e) =>
                                        handleUpdateOption(key as keyof Question["options"], e.target.value)}
                                        value={value}
                                        placeholder={`Enter option ${key}`}
                                    />

                                </div>
                            )
                        )}

                    </div>
                    <div className=" mt-3 flex gap-3">
                        <div className="w-[100px]">
                            <label className="block text-sm font-medium text-gray-700">
                                Correct Answer
                            </label>
                            <select
                                value={questions[curQuestion].answer}
                                onChange={(e) =>
                                    handleUpdateQuestion("answer", e.target.value)
                                }
                                className="w-[100%] h-[35px] border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                            </select>
                        </div>
                        <button
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
                            onClick={handlePrevQuestion}
                            disabled={curQuestion == 0}
                        >
                            Previous
                        </button>
                        <button
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                            onClick={handleNextQuestion}
                            disabled={curQuestion == questions.length - 1}
                        >
                            Next
                        </button>
                        <button
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                            onClick={handleAddNewQuestion}
                        >
                            Add Question
                        </button>
                    </div>
                </div>

                {/* Right Section - Question List */}
                <div className="w-1/3 h-full overflow-y-auto">
                    <h1 className="text-2xl font-bold mb-4">Question List</h1>
                    <div className="grid grid-cols-5 gap-4">
                        {questions.map((_, i) => (
                            <div
                                key={i}
                                className={`w-12 h-12 flex items-center justify-center rounded-full cursor-pointer text-lg font-semibold ${curQuestion === i
                                    ? "bg-indigo-600 text-white"
                                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                                    }`}
                                onClick={() => setCurQuestion(i)}
                            >
                                {i + 1}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionMaker;
