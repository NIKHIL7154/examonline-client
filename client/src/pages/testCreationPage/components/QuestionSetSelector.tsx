import { IoSearch } from "react-icons/io5";
import { MdOutlineClose } from "react-icons/md";
import { useState } from "react";
import { useTestConfig } from "../context/TestConfigContext";
import { useAuth } from "@clerk/clerk-react";
import useQuestionSet from "../../questionSetsPage/hooks/useQuestionSets";
import { useNavigate } from "react-router-dom";
import LoaderNew from "../../../components/LoaderNew";



function QuestionSetSelector() {

    const [searchInput, setSearchInput] = useState<string>('');
   
    const { testConfig, setTestConfig } = useTestConfig();
    const {testQuestions} = testConfig;
    const { getToken } = useAuth();
    const { isLoading, questionSets } = useQuestionSet(getToken);
    const navigate=useNavigate();

    if(isLoading) return <div className="w-full h-full flexed"><LoaderNew/></div>

    

    const { totalSets, sets } = questionSets.data;


   

    const userHasSearched = !(searchInput === "");

    const filteredQuestions = userHasSearched
        ? sets.filter(question =>
            question.name.toLowerCase().includes(searchInput.toLowerCase())
        )
        : sets;
    // const filteredQuestions=[]

    const handleClickToggle = (id: number) => {
        setTestConfig(cur => {
            if (cur.testQuestions.includes(id))
                return {
                    ...cur,
                    testQuestions: cur.testQuestions.filter(questionId => questionId !== id)
                };
            else return {
                ...cur,
                testQuestions: [...cur.testQuestions, id]
            }
        });

        // setTestQuestions(cur => {
        //     // Check if the id is already in the testQuestions array
        //     if (cur.includes(id)) {
        //         // If it is, remove it (toggle off)
        //         return cur.filter(questionId => questionId !== id);
        //     } else {
        //         // If it isn't, add it (toggle on)
        //         return [...cur, id];
        //     }
        // });
    };

    const handleDeselect = (id: number) => {
        setTestConfig(cur => {
            return {
                ...cur,
                testQuestions: cur.testQuestions.filter(questionId => questionId !== id),
            }
        })
        // setTestQuestions(cur => cur.filter(questionId => questionId !== id))
    }
    
    return (
        <div className="w-full px-32">
            <h2 className="text-[1.7rem] font-semibold mb-4">
                Start by selecting a question set...
            </h2>

            <div className="group relative border border-gray-400 mb-8 h-12 w-[90%] px-4 gap-2 rounded-full flex items-center focus-within:outline outline-2 outline-gray-700 ">
                <IoSearch className="text-2xl text-slate-500 group-focus-within:text-gray-700" />
                <input
                    type="text"
                    className="h-full text-lg flex-1 focus:outline-none bg-transparent"
                    placeholder="Search question by name"
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                />
            </div>

            {/* Display selected questions if any */}
            <div className={`text-lg mb-8 ${testQuestions.length > 0 ? "" : "hidden"}`}>

                <ul className="flex flex-wrap w-[1000px] gap-4">
                    {testQuestions.length > 0 &&
                        testQuestions.map(id =>

                            <li key={id} className="border-2 border-slate-300 rounded-full px-4 py-1 flex items-center justify-center gap-2 group cursor-pointer">
                                {sets.find(q => q._id === id)?.name}

                                <button onClick={() => handleDeselect(id)}>
                                    <MdOutlineClose className="text-xl group-hover:text-red-600 group-hover:scale-[1.2]  transition-all duration-150" />
                                </button>
                            </li>
                        )
                    }
                </ul>
            </div>

            {/* Display atleast 4 recent/search questions */}
            <div className=" w-full">

                <h4 className="text-lg mb-4">
                    {userHasSearched ? "Search Results" : "Recent"}
                </h4>

                <div className="w-full flex justify-center">
                    <ul className="grid grid-cols-4 gap-8">
                        {filteredQuestions.slice(0, 4).map(q => {
                            return (
                                <li
                                    key={q._id}
                                    className={`border-2  ${(testQuestions.includes(q._id)) ? "border-green-400 hover:outline-green-400" : "border-slate-400 hover:border-gray-600 hover:outline-gray-600"} 
                                            p-5 flex flex-col justify-between h-[200px] group
                                            w-[250px] rounded-md hover:outline-2 hover:outline cursor-pointer`}
                                    onClick={() => handleClickToggle(q._id)}
                                >
                                    <span className="border border-gray-400 flex items-center justify-center w-14 h-14 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor" className="h-9 w-9 text-gray-500 ">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 2.25h-9A2.25 2.25 0 005.25 4.5v15A2.25 2.25 0 007.5 21.75h9A2.25 2.25 0 0018.75 19.5v-15a2.25 2.25 0 00-2.25-2.25zM16.5 2.25v4.5h-4.5" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 10.5h7.5M8.25 13.5h7.5M8.25 16.5h4.5" />
                                        </svg>
                                    </span>

                                    <div>
                                        <h6 className="text-md font-semibold">{q.name}</h6>
                                        <p>Set id: {q._id.substring(0,8)}</p>
                                        <p>Questions: {q.totalQuestions}</p>
                                    </div>
                                </li>
                            )
                        })}
                        
                        

                    </ul>
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
                                    {userHasSearched ? "Create it now" : "Create a new one"}
                                </button>
                            </div>
                        )}

                </div>
            </div>

        </div>
    )
}

export default QuestionSetSelector;