import { TbTimeline } from "react-icons/tb";
// import SimpleLineChart from "../../ui/SimpleLineChart";
import { ReactNode } from "react";

interface EngagementChartProp {
    children: ReactNode;
    engagementRate: number;
}

function EngagementChart({ children, engagementRate }: EngagementChartProp) {
    return (
        <div className="h-70 bg-gray-50 rounded-2xl p-6">
            <h5 className="text-[15px] mb-2">Engagement</h5>
            {/* <h3 className="text-4xl tracking-wide">45.00%</h3> */}
            <h3 className="text-4xl tracking-wide">{engagementRate.toFixed(2)}%</h3>
            <div className="w-full h-[45%] pr-3 ">
                {/* <DoughnutChart/> */}
                {/* <EngagementChart /> */}
                {children}
            </div>

            <div className="h-12 p-2 flex gap-3">
                <div className=" flex items-center gap-1 text-sm py-1">
                    <TbTimeline className="text-[#82ca9d] size-5" />
                    Attempt Rate
                </div>
                <div className=" flex items-center gap-1 text-sm py-1">
                    <TbTimeline className="text-[#8884d8] size-5" />
                    Attempt Accuracy
                </div>
            </div>
        </div>
    );
}

export default EngagementChart;
