import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";

import { useNavigate } from "react-router";
import useQuestionSets from "../questions/useQuestionSets";
import { useTestDetails } from "./TestDetailsContext";
import LoaderNew from "../../ui/LoaderNew";
import SetCard from "../questions/SetCard";




function QuestionSetSelector() {

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
        ? sets.filter(question =>
            question.name.toLowerCase().includes(searchInput.toLowerCase())
        )
        : sets;
    // const filteredQuestions=[]

    const handleClickToggle = (e) => {
        const id=e.currentTarget.dataset.quesid;
        setTestDetails((prev)=>{
            return {
                ...prev,
                testSets: prev.testSets.includes(id)
                    ? prev.testSets.filter(q => q !== id)
                    : [...prev.testSets, id]
            }
        })
    };

    return (
        <div className="w-full px-16">
            <div className="flexed !justify-between w-full">
            <p className="text-[1.3rem] font-semibold  ">
                Start by selecting a question set...
            </p>

            <div className="group w-100 relative border border-gray-400  h-12  px-4 gap-2 rounded-full flex items-center focus-within:outline outline-2 outline-gray-700 ">
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
            
            
            
            

            {/* Display selected questions if any */}
            <div className={`text-lg mb-8 ${testSets.length > 0 ? "" : "hidden"}`}>

                <ul className="flex flex-wrap w-[1000px] gap-4">
                    {testSets.length > 0 &&
                        testSets.map(id =>

                            <li key={id} className="border-2 border-slate-300 rounded-full px-4 py-1 flex items-center justify-center gap-2 group cursor-pointer">
                                {sets.find(q => q._id === id)?.name}

                                
                            </li>
                        )
                    }
                </ul>
            </div>

            {/* Display atleast 4 recent/search questions */}
            <div className=" w-full mt-4">

                <h4 className="text-lg mb-4">
                    {userHasSearched ? "Search Results" : "Your Question Sets"}
                </h4>

                <div className="w-full flex justify-center">
                    <div className="grid grid-cols-4 gap-8">
                        {filteredQuestions.slice(0, 4).map(q => {
                            return (
                                <SetCard setItem={q} onClick={handleClickToggle}/>
                            )
                        })}
                        
                        

                    </div>
                    {filteredQuestions.length === 0 && (
                            <div className="flex flex-col items-center justify-center w-full">
                                
                                <p className="text-xl text-gray-500 mb-4">
                                    {userHasSearched ? "No results found" : "No question sets available"}
                                   </p>
                                <button 
                                    className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-all duration-150"
                                    onClick={() => {
                                        
                                        navigate("/app/questions")
                                    }}
                                >
                                    {userHasSearched ? "Create it now" : "Create a new set"}
                                </button>
                            </div>
                        )}

                </div>
            </div>

        </div>
    )
}

export default QuestionSetSelector;