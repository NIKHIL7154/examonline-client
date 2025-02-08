import SystemAnalysis from "../../components/overview/SystemAnalysis";
import TestAnalysis from "../../components/overview/TestAnalysis";

function OverviewPage() {
    return (
        <div className="size-full grid grid-cols-2 gap-[20px] p-5 overflow-y-auto">
            <TestAnalysis/>
            <SystemAnalysis/>            
        </div>

    );
}

export default OverviewPage