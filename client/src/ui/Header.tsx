import { UserButton } from '@clerk/clerk-react'
import brandLogo from "../assets/ExamFusion.png"
import { useUser } from '@clerk/clerk-react'
import { useLocation, useNavigate } from 'react-router';

function Header() {
    const { user } = useUser()
    const navigate=useNavigate();
    const isCreatingTest: boolean = useLocation().pathname.split("/")[2] === "create";
    return (
        <div className={`bg-gray-50 p-[1rem] px-[3.6rem] border-b border-gray-100 flex gap-5 items-center 
        ${isCreatingTest ? "justify-between" : "justify-end"}
         
        h-[62px]`}>
            {isCreatingTest &&
            <>
                <div className="flexed gap-2 items-center">
                    <img src={brandLogo} alt="ExamFusion" className="h-7" />
                    <span className="text-xl font-medium tracking-wide ">ExamFusion</span>
                </div>
                <button
                    onClick={() => navigate("/app")}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all shadow-md hover:shadow-lg"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path>
                    </svg>
                    Back To Dashboard
                </button>

            </>}
            <div className='flexed gap-4'>
                <UserButton />
                <p>{user?.fullName}</p>
            </div>

        </div>
    );
}

export default Header;
