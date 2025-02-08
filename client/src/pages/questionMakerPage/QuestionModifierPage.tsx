import { useForm, useFieldArray } from "react-hook-form";
import { genUID } from "../../helpers/gens";
import AutoTextArea from "./component/AutoTextArea";
import { getQuestions } from "../../helpers/QuestionSetStore";

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

const QuestionModifierPage = () => {
    const { control, handleSubmit, setValue } = useForm<{ questions: Question[] }>({
        defaultValues: {
            questions: getQuestions(),
        },
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "questions",
    });

    const onSubmit = (data: { questions: Question[] }) => {
        console.log("Form Data:", data);
        //create question set and save data to database
    };

    return (
        <div className="h-full bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 overflow-y-auto">
            <div className="w-[85%] mx-auto bg-white shadow-xl rounded-2xl ">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-8 ">
                    <div className="text-center">
                        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
                            Question Set Editor
                        </h1>
                        <p className="text-gray-600 mb-6">
                            Create a question set by adding questions and their options
                        </p>
                    </div>

                    {fields.map((field, index) => (
                        <div
                            key={field.id}
                            className="bg-white border-2 border-gray-200 rounded-lg shadow-sm p-6 relative"
                        >
                            <div className="absolute top-2 right-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (fields.length < 2) {
                                            alert("You need to have at least one question");
                                            return;
                                        }
                                        remove(index);
                                    }}
                                    className="text-red-500 hover:text-red-700 transition"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>

                            <div className="mb-4">
                                <label className="block text-lg font-semibold text-gray-700 mb-2">
                                    Question {index + 1}
                                </label>
                                <AutoTextArea
                                    defaultValue={field.question}
                                    onChange={(e) =>
                                        setValue(`questions.${index}.question`, e.target.value)
                                    }
                                    placeholder="Enter your question here"
                                    
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                                {Object.keys(field.options).map((key) => (
                                    <div key={key}>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">
                                            Option {key}
                                        </label>
                                        <AutoTextArea
                                            defaultValue={field.options[key as keyof Question["options"]]}
                                            onChange={(e) =>
                                                setValue(
                                                    `questions.${index}.options.${key}` as `questions.${number}.options.A` | `questions.${number}.options.B` | `questions.${number}.options.C` | `questions.${number}.options.D`,
                                                    e.target.value
                                                )
                                            }
                                            placeholder={`Enter option ${key}`}
                                           
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Correct Answer
                                </label>
                                <select
                                    onChange={(e) =>
                                        setValue(`questions.${index}.answer`, e.target.value as "A" | "B" | "C" | "D")
                                    }
                                    defaultValue={field.answer}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="A">Option A</option>
                                    <option value="B">Option B</option>
                                    <option value="C">Option C</option>
                                    <option value="D">Option D</option>
                                </select>
                            </div>
                        </div>
                    ))}

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() =>
                                append({
                                    question: "",
                                    options: { A: "", B: "", C: "", D: "" },
                                    answer: "A",
                                    id: genUID(6),
                                })
                            }
                            className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition flex items-center justify-center space-x-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            <span>Add Question</span>
                        </button>

                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition flex items-center justify-center space-x-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H 7a1 1 0 101.414 1.414L12.414 9H7a1 1 0 000 2h5.414l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                            </svg>
                            <span>Create Question Set</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default QuestionModifierPage;