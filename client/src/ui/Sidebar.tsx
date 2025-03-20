import brandLogo from "../assets/ExamFusion.png"
import MainNav from "./MainNav";
function Sidebar() {
    return (
        // <div className="max-md:hidden bg-gray-50 p-[3.2rem] px-[2.4rem] border-r border-gray-100 row-span-full flex flex-col gap-[3.2rem] ">
        <div className="bg-gray-50  p-[1.8rem] px-[1.6rem] border-r border-gray-100 min-w-[260px] w-[260px] flex flex-col gap-[1rem] ">
            {/* Logo */}
            <div className="flex flex-col gap-2 items-center">
                <img src={brandLogo} alt="ExamFusion" className="h-20" />
                <span className="text-2xl font-medium tracking-wide ">ExamFusion</span>
            </div>
            
            <MainNav />
        </div>
    );
}

export default Sidebar;
