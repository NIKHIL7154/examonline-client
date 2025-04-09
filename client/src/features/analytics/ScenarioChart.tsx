import { GoDotFill } from "react-icons/go";
import SimplePieChart from "../../ui/SimplePieChart";

export interface submissionDataType {
    timeoutSubmission: number;
    userSubmission: number;
    inactive_autosubmit: number;
    incidents_autosubmit: number | null;
}

export interface PieChartProp {
    submissionData: submissionDataType;
}

function ScenarioChart({ submissionData }: PieChartProp) {
    const { userSubmission } = submissionData;

    return (
        <div className="h-70 bg-gray-50 rounded-2xl p-6">
            {/* <DoughnutChart /> */}
            <h5 className="text-[15px] mb-2">Submission Scenario</h5>

            <div className="flex w-full min-h-[80%]">
                <div className="flex-1 flex flex-col justify-between">
                    <div className="leading-4">
                        <h3 className="text-4xl tracking-wide">{userSubmission.toFixed(2)}%</h3>
                        <small className="ml-0.5 font-medium text-[13px] text-gray-500">User submissions</small>
                    </div>

                    <p>
                        <span className="flex items-center gap-1">
                            <GoDotFill className="size-5 text-[#82ca9d]" />
                            <small className="text-[12.5px]">User Initiated</small>
                        </span>
                        <span className="flex items-center gap-1">
                            <GoDotFill className="size-5 text-[#6FA371]" />
                            <small className="text-[12.5px]">Inactive</small>
                        </span>
                        <span className="flex items-center gap-1">
                            <GoDotFill className="size-5 text-[#8884d8]" />
                            <small className="text-[12.5px]">Timeout</small>
                        </span>
                        {(submissionData.incidents_autosubmit !== null) &&
                            <span className="flex items-center gap-1">
                                <GoDotFill className="size-5 text-[#e25d5d]" />
                                <small className="text-[12.5px]">Malpractice</small>
                            </span>}

                    </p>
                </div>
                <SimplePieChart submissionData={submissionData}/>
            </div>
        </div>
    );
}

export default ScenarioChart;
