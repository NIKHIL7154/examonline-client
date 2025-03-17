import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";

import { useNavigate } from "react-router";
import useQuestionSets from "../questions/useQuestionSets";
import { useTestDetails } from "./TestDetailsContext";
import LoaderNew from "../../ui/LoaderNew";
import { MdOutlineClose } from "react-icons/md";
import QuestionSetCard from "../../ui/QuestionSetCard";

interface SetType {
    _id: string;
    name: string;
    totalQuestions: number;
    createdAt: Date;

}

function TestQuestionSets() {

    const [searchInput, setSearchInput] = useState<string>('');
    const { testDetails, setTestDetails } = useTestDetails();

    const {testSets} = testDetails;
    const { getToken } = useAuth();
    const { isLoading, questionSets } = useQuestionSets(getToken);
    const navigate=useNavigate();
    

    if(isLoading) return <div className="w-full h-full flexed"><LoaderNew/></div>

    const { sets } = questionSets.data;

   

    const userHasSearched = !(searchInput === "");

    const filteredQuestions = userHasSearched
        ? sets.filter((question:SetType) =>
            question.name.toLowerCase().includes(searchInput.toLowerCase())
        )
        : sets;


    const handleClickToggle = (e: React.MouseEvent<HTMLDivElement>) => {
        const id = e.currentTarget.dataset.quesid as string;
        setTestDetails((prev) => {
            return {
                ...prev,
                testSets: prev.testSets.includes(id)
                    ? prev.testSets.filter(q => q !== id)
                    : [...prev.testSets, id]
            }
        });
    };
    const handleDeselect = (id: string) => {
        setTestDetails((prev) => {
            return {
                ...prev,
                testSets: prev.testSets.filter(q => q !== id)
            }
        });
    }

    return (
        <div className="w-full px-16 py-6 ">
            <div className="flexed !justify-between w-full">
            <p className="text-[1.3rem] font-semibold  ">
                Select Question Sets for the Test
            </p>

            <div className="group w-100 relative border border-gray-400  h-10  px-4 gap-2 rounded-full flex items-center focus-within:outline outline-2 outline-gray-700 ">
                <IoSearch className="text-2xl text-slate-500 group-focus-within:text-gray-700" />
                <input
                    type="text"
                    className="h-full text-lg flex-1 focus:outline-none bg-transparent"
                    placeholder="Search question set by name"
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                />
            </div>
            </div>
            
            
            
            

            

            {/* Display atleast 4 recent/search questions */}
            <div className=" w-full  mt-4">

                <h4 className="text-lg mb-4">
                    {userHasSearched ? "Search Results" : "Your Question Sets"}
                </h4>

                <div className="w-full flex justify-center">
                    <div className="grid grid-cols-4 gap-8">
                        {filteredQuestions.slice(0, 4).map((q:SetType) => {
                            return (
                                <QuestionSetCard setItem={q} selected={testDetails.testSets.includes(q._id)}  onClick={handleClickToggle}/>
                            )
                        })}
                        
                        

                    </div>
                    {filteredQuestions.length === 0 && (
                            <div className="flex flex-col h-[200px]  items-center justify-center w-full">
                                
                                <p className="text-xl text-gray-500 mb-4">
                                    {userHasSearched ? "No Sets found" : "No question sets available"}
                                   </p>
                                <button 
                                    className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-all duration-150"
                                    onClick={() => {
                                        
                                        navigate("/app/questions")
                                    }}
                                >
                                    {userHasSearched ? "Create now" : "Create a new set"}
                                </button>
                            </div>
                        )}

                </div>
            </div>

            {/* Display selected questions if any */}
            <div className={`text-lg  w-full flexed flex-col  my-8 ${testSets.length > 0 ? "" : "hidden"}`}>
                <p className=" text-[1.3rem] font-semibold my-4 ">
                    Selected Question Sets</p>
                {testSets.length < 1 && <p className="text-sm text-gray-500 mb-4">Selected Sets will appear here</p>}
                <ul className="flex flex-wrap  gap-4">
                    {testSets.length > 0 &&
                        testSets.map(id =>

                            <li key={id} onClick={() => handleDeselect(id)} className="border-2 border-slate-300 rounded-full px-4 py-1 flex cursor-pointer items-center justify-center gap-2 group">
                                {sets.find((q:SetType) => q._id === id)?.name}
                                
                                    <MdOutlineClose className="text-xl cursor-pointer group-hover:text-red-600 group-hover:scale-[1.2]  transition-all duration-150" />
                                
                                
                            </li>
                        )
                    }
                </ul>
            </div>

        </div>
    )
}

export default TestQuestionSets;