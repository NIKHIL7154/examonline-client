import SimpleBarChart from "../../ui/SimpleBarChart";
import { testAnalyticsType } from "./AnalyticsBox";

interface Props {
    testAnalytics: testAnalyticsType[];
}

function ParticipationChart({ testAnalytics }: Props) {
    // const avgAttendance = 
    // console.log(testAnalytics);
    const totalAttdPercent = testAnalytics.reduce((acc, item) => {
        return acc + (item.attendance / item.expectedAttendance) * 100;
    }, 0);
    
    const avgAttdPercent = (totalAttdPercent / testAnalytics.length) || 0 ;


    // const percentAttdn = avgAttendance  

    return (
        <div className="h-80 bg-gray-50 rounded-2xl p-6 flex flex-col">
            <h5 className="text-[15px] mb-2">Participation</h5>
            <div className="flex-1 flex flex-col ">
                <div className="flex gap-1.5 mb-1.5">
                    <h3 className="text-3xl font-medium tracking-wide">{avgAttdPercent.toFixed(2)}%</h3>
                    <small className="self-end text-[14px] pb-1 text-gray-500">avg. </small>
                </div>
                <SimpleBarChart testAnalytics={testAnalytics}/>
            </div>
        </div>
    );
}

export default ParticipationChart;
