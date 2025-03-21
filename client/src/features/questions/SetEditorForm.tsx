import { useForm, useFieldArray } from "react-hook-form";
import AutoTextArea from "./AutoTextArea";
import toast from "react-hot-toast";
import { TbTrash } from "react-icons/tb";
import { IoWarningOutline } from "react-icons/io5";
// import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router";
import { getQuestions } from "../../utils/QuestionSetStore";
import Row from "../../ui/Row";
import { LuListPlus } from "react-icons/lu";
import { PiFloppyDiskBold } from "react-icons/pi";
import { FaArrowLeft } from "react-icons/fa6";
import SpinnerMini from "../../ui/SpinnerMini";
import { useAuth } from "@clerk/clerk-react";
import useCreateQuestionSet from "./useCreateQuestionSet";

type Question = {
    questionTitle: string;
    options: {
        A: string;
        B: string;
        C: string;
        D: string;
    };
    correctOption: "A" | "B" | "C" | "D";
    // id: string;
};

const SetEditorForm = () => {
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

    const handleDelete = (setLength: number, setItem: number) => {
        if (setLength < 2) {
            toast.error("Set cannot be empty");
            return;
        }
        remove(setItem);
    }

    const handleAdd = () => {
        append({
            questionTitle: "",
            options: { A: "", B: "", C: "", D: "" },
            correctOption: "A",
            // id: genUID(6),
        })
    }
    const onSubmit = (data: { name: string, questions: Question[] }) => {
        // create question set and save data to database
        createQuestionSet(data, {
            onSuccess: () => {
                reset();
                navigate(-1);
            },
        });
        // console.log(data);
    };

    // const onError = (errors: unknown) => {
    //     // console.error(errors);
    // };

    return (
        <div className="w-230 mx-auto">
            {/* <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6 p-8 "> */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                <div className=" border-gray-300 border px-7 py-6 rounded-lg bg-gray-50 space-y-3">
                    <label className="block text-xl font-medium text-gray-600 ">
                        Set Name
                    </label>
                    <input
                        type="text"
                        className="bg-gray-50 hover:border-gray-500 text-gray-600 font-medium py-2 w-full placeholder:text-gray-400 transition-all duration-200 border-b focus:placeholder-transparent border-gray-300 focus:border-purple-500 outline-none"
                        placeholder="Enter the name of the question set"
                        {...register("name", { required: "Please provide an unique name for the Question Set" })}
                    />

                    {errors?.name &&
                        <small className="text-xs flex gap-1 items-center pt-1 text-red-600 font-semibold">
                            <IoWarningOutline />
                            {errors?.name?.message}
                        </small>
                    }
                </div>

                {fields.map((field, index: number) => (
                    <div
                        key={index}
                        className="bg-gray-50 border border-gray-300 rounded-lg px-7 py-7 relative"
                    >
                        <div className="mb-4 space-y-2">
                            <Row type="horizontal">
                                <label htmlFor={`questionTitle-${index}`} className="block text-lg font-medium text-gray-600">
                                    Question {index + 1}
                                </label>
                                <button
                                    type="button"
                                    onClick={() => handleDelete(fields.length, index)}
                                    className="text-red-400 cursor-pointer hover:text-red-600 transition"
                                >
                                    <TbTrash className="text-2xl" />
                                </button>
                            </Row>
                            <AutoTextArea
                                id={`questionTitle-${index}`}
                                defaultValue={field.questionTitle}
                                
                                {...register(`questions.${index}.questionTitle`, { required: "Question Title is cannot be empty" })}
                                placeholder="Enter your question here"

                            />
                            {errors?.questions?.[index]?.questionTitle &&
                                <span className="text-xs flex gap-1 items-center text-red-600 font-semibold">
                                    <IoWarningOutline />
                                    {errors?.questions?.[index]?.questionTitle?.message}
                                </span>
                            }
                        </div>

                        <div className="grid grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg">
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
                                        <span className="text-xs flex gap-1 items-center pt-2 text-red-600 font-semibold">
                                            <IoWarningOutline />
                                            {errors.questions[index].options[key as keyof Question["options"]]?.message}
                                        </span>
                                    }
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 space-y-2">
                            <label htmlFor={`correctOption-${index}`} className="block text-sm font-medium text-gray-600 ">
                                Correct Answer
                            </label>
                            <select
                                id={`correctOption-${index}`}
                                {...register(`questions.${index}.correctOption`, { required: "Correct Answer is required" })}
                                defaultValue={field.correctOption}
                                className="w-full text-gray-600 font-medium hover:border-gray-500 transition-all duration-200 border cursor-pointer outline-none  border-gray-300 p-2 rounded-md focus:ring-purple-500 focus:border-purple-500"
                            >
                                <option value="A">Option A</option>
                                <option value="B">Option B</option>
                                <option value="C">Option C</option>
                                <option value="D">Option D</option>
                            </select>
                        </div>
                    </div>
                ))}

                <div className="flex justify-end gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        type="button"
                        disabled={isCreating}
                        className=" cursor-pointer text-gray-600 group hover:bg-gray-200 px-4 py-3 transition duration-200 flex items-center border border-gray-300 bg-gray-50 rounded-lg gap-2"
                    >
                        <FaArrowLeft className="text-lg group-hover:text-black" />
                        <span className="text-[0.96rem]">Back</span>
                    </button>
                    <button
                        type="button"
                        onClick={handleAdd}
                        disabled={isCreating}
                        className=" group hover:bg-gray-200 cursor-pointer text-gray-600  px-4 py-3 transition duration-200 flex items-center border border-gray-300 bg-gray-50 rounded-lg gap-2 "
                    >
                        <LuListPlus className="text-xl text-gray-700 group-hover:text-gray-900" />
                        <span className="text-[0.96rem]">Add Question</span>
                    </button>


                    <button
                        type="submit"
                        className="h-[50px] cursor-pointer text-gray-600 group hover:bg-gray-200 px-4 py-3 transition duration-200 flex items-center border border-gray-300 bg-gray-50 rounded-lg gap-2"
                        disabled={isCreating}
                    >
                        {isCreating
                            ? <><SpinnerMini className="size-5 text-gray-800"/>
                                <span className="text-[0.96rem]">Saving</span></>
                            : <><PiFloppyDiskBold className="text-xl group-hover:text-black" />
                                <span className="text-[0.96rem]">Save</span></>
                        }

                    </button>
                </div>
            </form>
        </div>
        // </div>
    );
}

export default SetEditorForm;