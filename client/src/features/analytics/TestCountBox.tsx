import { HiOutlineClipboardList } from "react-icons/hi";
import ProgressBar from "../../ui/ProgressBar";
import { TestCountType } from "./AnalyticsBox";

interface Props {
    hostedTestCount: TestCountType;
}

function TestCountBox({hostedTestCount}: Props) {
    const {basic, proctured} = hostedTestCount;
    const totalCount = (basic + proctured) || 0;
    return (
        <div className="p-4 h-32 bg-gray-50 rounded-2xl flex gap-4">
            <div className="h-full w-[27%] p-2 flex flex-col justify-center items-center rounded-3xl bg-[#a9d8aa5b]">
                <span className="font-semibold text-2xl">{totalCount}</span>
                <HiOutlineClipboardList className="text-2xl" />
            </div>
            <div className="flex-1 pt-1.5">
                <p className="text-lg font-medium mb-1">Hosted Tests</p>
                <div className="flex w-full items-center gap-3 group cursor-pointer">

                    <span className="w-30">Basic</span>
                    <ProgressBar percentage={((basic/totalCount)*100)} position="top" />
                </div>
                <div className="flex w-full items-center gap-3 group cursor-pointer">

                    <span className="w-30">Proctured</span>
                    <ProgressBar percentage={((proctured/totalCount)*100)} position="bottom" />
                </div>

            </div>
        </div>
    );
}

export default TestCountBox;
