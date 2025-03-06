import { useForm, useFieldArray } from "react-hook-form";
import { genUID } from "../../helpers/gens";
import AutoTextArea from "./component/AutoTextArea";
import { getQuestions } from "../../helpers/QuestionSetStore";
import toast from "react-hot-toast";
import { TbTrash } from "react-icons/tb";
import { IoWarningOutline } from "react-icons/io5";
import { MdAdd, MdSubdirectoryArrowRight } from "react-icons/md";
import useCreateQuestionSet from "../questionSetsPage/hooks/useCreateQuestionSet";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import SpinnerMini from "../../components/SpinnerMini";

type Question = {
    questionTitle: string;
    options: {
        A: string;
        B: string;
        C: string;
        D: string;
    };
    correctOption: "A" | "B" | "C" | "D";
    id: string;
};

const QuestionModifierPage = () => {
    const navigate = useNavigate();
    const { getToken } = useAuth();
    const { register, control, handleSubmit, formState, reset } = useForm<{ name: string, questions: Question[] }>({
        defaultValues: {
            name: "",
            questions: getQuestions(),
        },
    });
    const { errors } = formState;

    const { isCreating, createQuestionSet } = useCreateQuestionSet(getToken);

    const { fields, append, remove } = useFieldArray({
        control,
        name: "questions",
    });

    const onSubmit = (data: { name: string, questions: Question[] }) => {
        //create question set and save data to database
        createQuestionSet(data, {
            onSuccess: () => {
                reset();
                navigate(-1);
            },
        });
    };

    // const onError = (errors: unknown) => {
    //     // console.error(errors);
    // };

    return (
        <div className="h-full bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 overflow-y-auto">
            <div className="w-[85%] mx-auto bg-white shadow-xl rounded-2xl ">
                {/* <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6 p-8 "> */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-8 ">
                    <div className="text-center">
                        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
                            Question Set Editor
                        </h1>
                        <p className="text-gray-600 mb-6">
                            Create a question set by adding questions and their options
                        </p>
                    </div>

                    <div className="mb-4">
                        <label className="block text-lg font-semibold text-gray-700 mb-2">
                            Question Set Name
                        </label>
                        <input
                            type="text"
                            className="w-full border-b border-gray-300 rounded-sm focus:ring-indigo-500 focus:border-indigo-500 focus:border-b-2 outline-none"
                            placeholder="Enter the name of the question set"
                            {...register("name", { required: "Please provide an unique name for the Question Set" })}
                        />
                        {errors?.name &&
                            <span className="text-xs flex gap-1 items-center pt-1 text-red-600 font-semibold">
                                <IoWarningOutline />
                                {errors?.name?.message}
                            </span>
                        }
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
                                            // alert("You need to have at least one question");
                                            toast.error("You need to have at least one question");
                                            return;
                                        }
                                        remove(index);
                                    }}
                                    className="text-red-500 hover:text-red-700 transition"
                                >
                                    <TbTrash className="text-2xl" />
                                </button>
                            </div>

                            <div className="mb-4">
                                <label htmlFor={`questionTitle-${index}`} className="block text-lg font-semibold text-gray-700 mb-2">
                                    Question {index + 1}
                                </label>
                                <AutoTextArea
                                    id={`questionTitle-${index}`}
                                    defaultValue={field.questionTitle}
                                    {...register(`questions.${index}.questionTitle`, { required: "Question Title is required" })}
                                    placeholder="Enter your question here"

                                />
                                {errors?.questions?.[index]?.questionTitle &&
                                    <span className="text-xs flex gap-1 items-center pl-2 pt-1 text-red-600 font-semibold">
                                        <IoWarningOutline />
                                        {errors?.questions?.[index]?.questionTitle?.message}
                                    </span>
                                }
                            </div>

                            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                                {Object.keys(field.options).map((key) => (
                                    <div key={key}>
                                        <label htmlFor={`option-${index}-${key}`} className="block text-sm font-medium text-gray-600 mb-1">
                                            Option {key}
                                        </label>
                                        <AutoTextArea
                                            id={`option-${index}-${key}`}
                                            defaultValue={field.options[key as keyof Question["options"]]}
                                            {...register(`questions.${index}.options.${key as keyof Question["options"]}`, { required: `Options cannot be empty` })}
                                            placeholder={`Enter option ${key}`}
                                        />
                                        {errors?.questions?.[index]?.options?.[key as keyof Question["options"]] &&
                                            <span className="text-xs flex gap-1 items-center pl-2 pt-1 text-red-600 font-semibold">
                                                <IoWarningOutline />
                                                {errors.questions[index].options[key as keyof Question["options"]]?.message}
                                            </span>
                                        }
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4">
                                <label htmlFor={`correctOption-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                                    Correct Answer
                                </label>
                                <select
                                    id={`correctOption-${index}`}
                                    {...register(`questions.${index}.correctOption`, { required: "Correct Answer is required" })}
                                    defaultValue={field.correctOption}
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
                                    questionTitle: "",
                                    options: { A: "", B: "", C: "", D: "" },
                                    correctOption: "A",
                                    id: genUID(6),
                                })
                            }
                            className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition flex items-center justify-center space-x-2"
                        >
                            <MdAdd className="text-2xl" />
                            <span>Add Question</span>
                        </button>

                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition flex items-center justify-center space-x-2"
                        >
                            {isCreating
                                ? <SpinnerMini type="sm"/>
                                : <><MdSubdirectoryArrowRight className="text-xl" />
                                    <span>Create Question Set</span></>
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default QuestionModifierPage;