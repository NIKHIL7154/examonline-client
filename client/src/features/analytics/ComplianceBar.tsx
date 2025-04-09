import ProgressBar from "../../ui/ProgressBar";

function ComplianceBar({incidentsRate}: {incidentsRate: number}) {
    const complianceRate = Math.trunc((100 - incidentsRate) || 0);
    return (
        <div className="h-25 bg-gray-50 rounded-2xl flex p-4 gap-3">

            <div className="h-full w-[27%] p-2 flex flex-col justify-center items-center rounded-3xl bg-[#a9d8aa5b]">
                <span className="font-semibold text-2xl">{complianceRate}%</span>
            </div>
            <div className="flex-1 pt-1.5 group ">
                <p className="text-md mb-2 font-medium">Compliance Rate</p>

                <ProgressBar percentage={complianceRate} position="bottom" />
            </div>
        </div>
    );
}

export default ComplianceBar;
