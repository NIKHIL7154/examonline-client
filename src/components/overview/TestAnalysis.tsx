import ProgressBar from "./ProgressBar";
import PieChart from "./PieChart";

function TestAnalysis() {
    return (
        <div className="grid grid-cols-2 gap-[20px] grid-rows-auto">

            {/* Row 1 Progress Bar */}
            <div className="h-[160px] rounded-[15px] col-span-full
            flex flex-col justify-center items-center px-[30px] bg-[#D9D9D9] 
            ">
                <h3 className="mb-[10px] text-xl">Overall Completion</h3>
                <ProgressBar percentage={50} />
            </div>

            {/* Row 2 */}
            <div className="h-[210px] p-[30px] rounded-[15px] bg-[#D9D9D9] flex flex-col  items-center justify-center         
            gap-4">
                <h2 className="text-2xl">Compliance Rate</h2>
                <div className="flex w-full justify-center gap-10 items-center">
                    <p className="text-6xl"> 95%</p>
                    <span className="w-0 h-0 border border-l-[30px] border-r-[30px] border-b-[40px] border-b-[#8AD191] border-l-transparent border-r-transparent border-t-transparent"/>

                </div>
            </div>

            <div className="h-[210px] p-[30px] rounded-[15px] bg-[#D9D9D9] flex flex-col  items-center  justify-center       
            gap-4">
                <h2 className="text-2xl">User Satisfaction</h2>
                <div className="flex w-full justify-center gap-10 items-center">
                    <p className="text-6xl"> 60%</p>
                    <span className="w-0 h-0 border border-l-[30px] border-r-[30px] border-t-[40px] border-t-[#D83B22] border-l-transparent border-r-transparent border-b-transparent"/>

                </div>
            </div>

            {/* Row 2 Pie chart */}
            <div className="h-[360px] bg-[#D9D9D9] rounded-[15px] col-span-full flex flex-col p-[20px] items-center">
                <h3 className="text-xl mb-3">Exam Scenario</h3>
                <PieChart />
            </div>
        </div>
    );
}

export default TestAnalysis;