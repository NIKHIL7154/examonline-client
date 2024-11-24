import ProgressBar from "./ProgressBar";
import BarChart from "./BarChart";
import Gauge from "./Gauge";

function SystemAnalysis() {
    return (
        <div className="grid grid-cols-2 gap-[15px] grid-rows-auto">

            {/* Row 1 */}
            <div className="h-[100px] rounded-[15px] col-span-full
            flex flex-col justify-center items-center px-[30px] bg-white 
            ">
                <h3 className="mb-[10px] text-lg">Technical Issue Handling</h3>
                <ProgressBar percentage={70} />
            </div>

            {/* Row 2 */}
            <div className="h-[180px] p-[30px] rounded-[15px] bg-white flex flex-col  items-center             
            gap-4">
                <h2 className="text-2xl">Technical Issue</h2>
                <div className="flex w-full justify-center gap-10 items-center">
                    <p className="text-6xl"> 10%</p>
                    <span className="w-0 h-0 border border-l-[30px] border-r-[30px] border-b-[40px] border-b-[#8AD191] border-l-white border-r-white border-t-white"></span>

                </div>
            </div>

            <div className="h-[180px] p-[30px] rounded-[15px] bg-white flex flex-col  items-center             
            gap-4">
                <h2 className="text-2xl">Engagement</h2>
                <div className="flex w-full justify-center gap-10 items-center">
                    <p className="text-6xl"> 75%</p>
                    <span className="w-0 h-0 border border-l-[30px] border-r-[30px] border-t-[40px] border-t-[#D83B22] border-l-white border-r-white border-b-white"></span>

                </div>
            </div>

            {/* Row 3 */}
            <div className="h-[150px] rounded-[15px] col-span-full bg-white flex justify-center gap-8 items-center px-[30px]">
                <BarChart />
                <h3 className="text-lg">Averate <br /> Time</h3>
            </div>

            {/* Row 4 */}
            <div className="h-[150px] bg-white rounded-[15px] col-span-full flex flex-col pt-[5px] px-[30px]">
                <h3 className="text-lg">Incidents</h3>
                <div className="flex justify-center">
                    <Gauge />
                </div>
            </div>

        </div>
    );
}

export default SystemAnalysis;