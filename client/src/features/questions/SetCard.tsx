import { format } from "date-fns";
import { HiOutlineCalendar, HiOutlineQuestionMarkCircle } from "react-icons/hi";
import { TbFileText } from "react-icons/tb";
import { Link } from "react-router";

interface Set {
    _id: string;
    name: string;
    totalQuestions: number;
    createdAt: Date;
}

interface SetProp {
    setItem: Set;
}

function SetCard({ setItem }: SetProp) {
    const { _id: setId, name, totalQuestions, createdAt } = setItem;
    return (
        <div className="h-50 w-68 border border-gray-200 py-5 px-6 rounded-xl bg-gray-50 hover:shadow-md hover:shadow-gray-200 transition-all duration-200">
            <p className="p-2 w-fit rounded-lg bg-gray-200 text-gray-500">
                <TbFileText className="text-3xl" />
            </p>

            <div className="space-y-3 mt-4">
                <h3 className="font-medium first-letter:uppercase text-[1.1rem]">{name}</h3>

                <div className="space-y-1 text-gray-600">
                    <p className="flex gap-2 items-center">
                        <HiOutlineQuestionMarkCircle />
                        <span className="text-sm">{totalQuestions} question </span>
                    </p>
                    <p className="flex gap-2 items-center">
                        <HiOutlineCalendar />
                        <span className="text-sm"> {format(createdAt, 'MMM dd, yyyy')}</span>
                    </p>
                </div>
            </div>
            <Link to={`${setId}`} className="text-sm flex justify-end text-gray-700 font-medium">
                <span className="hover:text-green-600 cursor-pointer">more &rarr;</span>
            </Link>
        </div>
    );
}

export default SetCard;
