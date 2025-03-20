import { format } from "date-fns";
import { HiOutlineCalendar, HiOutlineQuestionMarkCircle } from "react-icons/hi";
import { TbFileText } from "react-icons/tb";

import { IoCheckmarkDoneCircle } from "react-icons/io5";
interface Set {
    _id: string;
    name: string;
    totalQuestions: number;
    createdAt: Date;
    
}

interface SetProp {
    setItem: Set;
    onClick?: (e:React.MouseEvent<HTMLDivElement>) => void;
    selected?: boolean;
}

function QuestionSetCard({ setItem, onClick = undefined ,selected=true }: SetProp) {
    const { _id: setId, name, totalQuestions, createdAt} = setItem;
    return (
        <div className={`h-50 w-68 border relative cursor-pointer  py-5 px-6 rounded-xl ${selected?"border-green-100 bg-green-100":"border-gray-200 bg-gray-50"} hover:shadow-md hover:shadow-gray-200 transition-all duration-200`}
            data-quesid={setId}
            onClick={onClick}
        >
            <p className="p-2 w-fit rounded-lg ">
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
            {selected && <IoCheckmarkDoneCircle className="absolute right-5 top-3 text-green-500 text-3xl"/>}


            
        </div>
    );
}

export default QuestionSetCard;
