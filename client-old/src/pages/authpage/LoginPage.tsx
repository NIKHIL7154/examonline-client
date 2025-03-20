import { FaGoogle } from "react-icons/fa6";
import { BsApple } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import lady from "../../assets/unsure.svg";
import { FormEvent, useState } from "react";
import { useSignIn } from "@clerk/clerk-react";


import { useNavigate } from "react-router-dom";
function LoginPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const {setActive,signIn}=useSignIn();

    const navigate=useNavigate();
    // f6faf4
    const handleSubmit =async (e: FormEvent) => {
        e.preventDefault();
         // Regex for validating email
         const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

         // Regex for validating password (at least 8 characters, one number, one special character)
         const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
 
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
            const obj=signIn?.create({identifier:email,strategy:"password",password:password,})
            obj?.then(async (res)=>{
                console.log(res)
               
                if (setActive && res.createdSessionId) {
                    await setActive({ session: res.createdSessionId });
                    navigate('/app')
                }
                
            }).catch((err)=>{
                
                console.log(JSON.stringify(err))
            })
            
         } catch (error) {
            alert(error)
         }
         
        
        
    };

    return <div className="min-h-screen flex justify-center items-center poppins-regular">
        
        <div className=" w-[1000px] h-[600px] flex ">
            <div className="w-full p-10 flex flex-col items-center gap-[2.5rem] border-y border-l rounded-l-[15px]">

                <div className="flex flex-col justify-center items-center w-[350px]">
                    <h1 className="text-4xl poppins-medium tracking-normal">Welcome back!</h1>
                    <small className="break-words p-2 text-center poppins-medium text-slate-500">
                        Streamline your exam process and boost efficiency with our app. Start for free today!
                    </small>
                </div>

                <form className="flex flex-col gap-3 w-[400px]" onSubmit={handleSubmit}>
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
                    <button className="text-[0.8rem] poppins-medium ml-auto hover:text-gray-400"> Forgot Password?</button>
                    <button type="submit" className="hover:bg-white hover:text-black hover:border-black border border-black bg-black text-white py-2 rounded-[25px]">Login</button>
                </form>


                <div className="flex flex-col gap-[20px] w-[400px] ">
                    <div className=" flex flex-row justify-evenly items-center">
                        <hr className="border border-gray-300 w-full" />
                        <small className="break-keep w-full poppins-medium text-slate-800  flex justify-center">or continue with</small>
                        <hr className="w-full border border-gray-300" />
                    </div>
                    <div className="flex flex-row justify-center gap-[2rem]">
                        <button className="h-[55px] w-[55px] flex border bg-black rounded-[50%] text-white hover:bg-white hover:text-black">
                            <FaGoogle className="text-2xl my-auto mx-auto" /></button>
                        <button className="h-[55px] w-[55px] flex border bg-black rounded-[50%] text-white hover:bg-white hover:text-black">
                            <BsApple className="text-2xl my-auto mx-auto" /></button>
                        <button className="h-[55px] w-[55px] flex border bg-black rounded-[50%] text-white hover:bg-white hover:text-black">
                            <MdOutlineEmail className="text-3xl my-auto mx-auto" /></button>
                    </div>
                </div>

                <small>Not a member? <button className="hover:text-[#2d4d25] text-[#4d7743] font-medium">Register now</button></small>
            </div>
            <div className="p-10 bg-[#f0faea] gap-[3rem] text-center w-full size-full rounded-[15px] flex flex-col justify-center items-center">

                <img src={lady} alt="lady" />
                <p className="text-xl">Streamline your exam process and boost efficiency with our app. </p>
            </div>

        </div>

    </div>
}

export default LoginPage;