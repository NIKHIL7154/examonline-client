import { Outlet, useLocation, useNavigate } from "react-router";
import Header from "../ui/Header";
import Sidebar from "../ui/Sidebar";
import VerifyUserInDataBase from "../features/authentication/VerifyUserInDataBase";
import { useEffect } from "react";
import { SignedIn, useAuth } from "@clerk/clerk-react";
// import { useUser } from "@clerk/clerk-react";

function AppLayout() {
    // const [userVerification, setuserVerification] = useState(true);
    const { userId, isLoaded } = useAuth()
    const navigate = useNavigate()
    // const { user } = useUser();

    useEffect(() => {
        if (isLoaded && !userId) {
            navigate('/auth')
            return;
        }

    }, [isLoaded, userId, navigate])

    const route = useLocation().pathname.split("/")[2]

    if (!isLoaded) return (<VerifyUserInDataBase />)

    return (
        // <div className="max-md:grid-cols-none grid grid-cols-[16rem_1fr] grid-rows-[auto_1fr] h-screen ">
        <SignedIn>
            <div className="w-[100vw] flex h-screen poppins-regular">
                {route != "create" && <Sidebar />}
                <div className="flex-grow flex flex-col gap-3.2rem">

                    <Header />
                    {/* <Sidebar /> */}
                    <main className=" bg-gray-100 w-full flex-grow p-[2.8rem] px-[3.2rem] pb-[3.2rem] overflow-y-auto">
                        <div className="w-full h-full mx-auto flex flex-col gap-[3.2rem]">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>

        </SignedIn>
    );
}

export default AppLayout;
