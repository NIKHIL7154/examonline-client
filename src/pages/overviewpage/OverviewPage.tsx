import SystemAnalysis from "../../components/overview/SystemAnalysis";
import TestAnalysis from "../../components/overview/TestAnalysis";

function OverviewPage() {
    return (
        <div className="size-full grid grid-cols-2 gap-[15px] p-5">
            <TestAnalysis/>
            <SystemAnalysis/>            
        </div>

    );
}

export default OverviewPage