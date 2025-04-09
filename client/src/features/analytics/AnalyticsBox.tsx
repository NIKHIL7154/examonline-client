import EngagementChart from "./EngagementChart";
import ScenarioChart from "./ScenarioChart";
import ParticipationChart from "./ParticipationChart";
import TestCountBox from "./TestCountBox";
import ComplianceBar from "./ComplianceBar";
import RecentTests from "./RecentTests";
import { useAuth } from "@clerk/clerk-react";
import useAnalytics from "./useAnalytics";
import SimpleLineChart from "../../ui/SimpleLineChart";
import useTestCount from "./useTestCount";

export interface testAnalyticsType {
    testAt: Date;
    attendance: number;
    expectedAttendance: number;
    overallAttemptRate: number;
    overallAttemptAccuracy: number;
}

export interface TestCountType {
    basic: number;
    proctured: number;
}


function AnalyticsBox() {
    const { getToken } = useAuth();
    const { isLoading: isAnalysing, analytics } = useAnalytics(getToken)
    const { isLoading: isLoadingCount, testCount } = useTestCount(getToken)

    if (isAnalysing || isLoadingCount) return (<div>Loading</div>)

    const { documents, overallAttemptRate, submissionType, incidentsRatePerStudent } = analytics.data.analytics[0];
    // console.log(analytics.data);
    const { testCount: hostedTestCount } = testCount.data
    // console.log(submissionType);


    return (
        <div className="grid grid-cols-3 gap-5">
            <div className="grid grid-cols-2 gap-5 col-span-2">
                <EngagementChart engagementRate={overallAttemptRate}>
                    <SimpleLineChart testAnalytics={documents} />
                </EngagementChart>

                <ScenarioChart submissionData={submissionType} />
                <RecentTests />
            </div>

            <div className="space-y-5" >
                <TestCountBox hostedTestCount={hostedTestCount} />
                <ParticipationChart testAnalytics={documents} />
                <ComplianceBar incidentsRate={incidentsRatePerStudent}/>
            </div>
        </div>
    );
}

export default AnalyticsBox;
