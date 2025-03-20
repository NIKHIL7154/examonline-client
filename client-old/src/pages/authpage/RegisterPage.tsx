import { FaGoogle } from "react-icons/fa6";
import { BsApple } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import man from "../../assets/person_window.svg";
import { useState, FormEvent } from "react";
import {useClerk, useSignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
    // f6faf4
    const [userName, setUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const {setActive,signUp}=useSignUp();
  
    const navigate=useNavigate();
    const clerk = useClerk()
    const handleSubmit =async (e: FormEvent) => {
        e.preventDefault();

        // Regex for validating email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        // Regex for validating password (at least 8 characters, one number, one special character)
        const passwordRegex = /^.{6,}$/;

        if (!emailRegex.test(email)) {
            setError("Please enter a valid email.");
            console.log(error);
            return;
        }
        
        if (!passwordRegex.test(password)) {
            setError("Password must be at least 8 characters, contain a number and a special character.");
            console.log(error);
            return;
        }
        try {
            const obj=  signUp?.create({emailAddress:email,password:password,firstName:userName,lastName:"hk",actionCompleteRedirectUrl:'/app',legalAccepted:true});
            obj?.then(async (res)=>{
                console.log(res)
    
                if (setActive && res.createdSessionId) {
                    await setActive({ session: res.createdSessionId });
                    navigate('/app')
                }
            }).catch((err)=>{
              
                console.log(err)
            })
        } catch (error) {
            console.log(error)
       
        }
        
        
        
    };
    const handleGoogleSignup = async () => {
     clerk.openSignUp()
    }

    return (
        <div className="min-h-screen flex justify-center items-center poppins-regular">
            
            <div className="w-[1000px] h-[600px] flex">
                <div className="p-10 bg-[#f0faea] gap-[3rem] text-center w-full size-full rounded-[15px] flex flex-col justify-center items-center">
                    <img src={man} alt="man" />
                    <p className="text-xl">
                        Streamline your exam process and boost efficiency with our app.
                    </p>
                </div>

                <div className="w-full p-10 flex flex-col items-center gap-[2.5rem] border-y border-r rounded-r-[15px]">
                    <div className="flex flex-col justify-center items-center w-[350px]">
                        <h1 className="text-4xl poppins-medium tracking-normal">Get Started</h1>
                        <small className="break-words p-2 text-center poppins-medium text-slate-500">
                            Streamline your exam process and boost efficiency with our app. Start for free today!
                        </small>
                    </div>

                    <form className="flex flex-col gap-3 w-[400px]" onSubmit={handleSubmit}>
                        <input
                            className="border-2 border-gray-500 px-6 py-2 rounded-[25px]"
                            type="text"
                            placeholder="Username"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                        <input
                            className="border-2 border-gray-500 px-6 py-2 rounded-[25px]"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            className="border-2 border-gray-500 px-6 py-2 rounded-[25px]"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            className="hover:bg-white hover:text-black hover:border-black border border-black bg-black text-white py-2 rounded-[25px]"
                        >
                            Sign Up
                        </button>
                    </form>

                    <div className="flex flex-col gap-[20px] w-[400px]">
                        <div className="flex flex-row justify-evenly items-center">
                            <hr className="border border-gray-300 w-full" />
                            <small className="break-keep w-full poppins-medium text-slate-800 flex justify-center">
                                or continue with
                            </small>
                            <hr className="w-full border border-gray-300" />
                        </div>
                        <div className="flex flex-row justify-center gap-[2rem]">
                            <button onClick={handleGoogleSignup} className="h-[55px] w-[55px] flex border bg-black rounded-[50%] text-white hover:bg-white hover:text-black">
                                <FaGoogle className="text-2xl my-auto mx-auto" />
                            </button>
                            <button className="h-[55px] w-[55px] flex border bg-black rounded-[50%] text-white hover:bg-white hover:text-black">
                                <BsApple className="text-2xl my-auto mx-auto" />
                            </button>
                            <button className="h-[55px] w-[55px] flex border bg-black rounded-[50%] text-white hover:bg-white hover:text-black">
                                <MdOutlineEmail className="text-3xl my-auto mx-auto" />
                            </button>
                        </div>
                    </div>

                    <small>
                        Already a member?{" "}
                        <button onClick={()=>{navigate("/auth/login")}} className="hover:text-[#2d4d25] text-[#4d7743] font-medium">
                            Sign in
                        </button>
                    </small>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;