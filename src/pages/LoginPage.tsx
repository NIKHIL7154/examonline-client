import { FaGoogle } from "react-icons/fa6";
import { BsApple } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import lady from "../assets/unsure.svg";

function TestPage() {
    // f6faf4
    return <div className="min-h-screen flex justify-center items-center poppins-regular">
        <div className=" w-[1000px] h-[600px] flex ">
            <div className="w-full p-10 flex flex-col items-center gap-[2.5rem] border-y border-l">

                <div className="flex flex-col justify-center items-center w-[350px]">
                    <h1 className="text-4xl poppins-medium tracking-normal">Welcome back!</h1>
                    <small className="break-words p-2 text-center poppins-medium text-slate-500">
                        Streamline your exam process and boost efficiency with our app. Start for free today!
                    </small>
                </div>

                <form className="flex flex-col gap-3 w-[400px]">
                    <input className="border border-2 border-gray-500 px-6 py-2 rounded-[25px]" type="text" placeholder="Username" />
                    <input className="border border-2 border-gray-500 px-6 py-2 rounded-[25px]" type="text" placeholder="Password" />
                    <button className="text-[0.8rem] poppins-medium ml-auto"> Forgot Password?</button>
                    <button type="submit" className="hover:bg-white hover:text-black hover:border-black border border-black bg-black text-white py-2 rounded-[25px]">Login</button>
                </form>


                <div className="flex flex-col gap-[20px] w-[400px] ">
                    <div className=" flex flex-row justify-evenly items-center">
                        <hr className="border border-gray-300 w-full" />
                        <small className="break-keep w-full poppins-medium text-slate-800  flex justify-center">or continue with</small>
                        <hr className="w-full border border-gray-300" />
                    </div>
                    <div className="flex flex-row justify-center gap-[2rem]"> 
                        <span className="h-[55px] w-[55px] flex border bg-black rounded-[50%] text-white">
                            <FaGoogle className="text-2xl my-auto mx-auto"/></span>
                        <span className="h-[55px] w-[55px] flex border bg-black rounded-[50%] text-white">
                            <BsApple className="text-2xl my-auto mx-auto"/></span>
                        <span className="h-[55px] w-[55px] flex border bg-black rounded-[50%] text-white">
                            <MdOutlineEmail className="text-3xl my-auto mx-auto"/></span>
                    </div>
                </div>

                    <small>Not a member? Register now</small>
            </div>
            <div className="p-10 bg-[#f0faea] gap-[3rem] text-center w-full size-full rounded-[15px] flex flex-col justify-center items-center">

                <img src={lady} alt="lady" />
                <p className="text-xl">Streamline your exam process and boost efficiency with our app. </p>
            </div>

        </div>

    </div>
}

export default TestPage;