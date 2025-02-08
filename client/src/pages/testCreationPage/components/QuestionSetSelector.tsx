import { IoSearch } from "react-icons/io5";
import { MdOutlineClose } from "react-icons/md";
import { useState } from "react";
import { useTestConfig } from "../context/TestConfigContext";

const questionSet = [
    {
        name: "Set 5",
        id: 5,
        questions: 10
    },
    {
        name: "Aptitude 101",
        id: 4,
        questions: 10
    },
    {
        name: "General Knowledge",
        id: 3,
        questions: 10
    },
    {
        name: "Computer Basics",
        id: 2,
        questions: 10
    },
    {
        name: "Set 1",
        id: 1,
        questions: 10
    },
]

function QuestionSetSelector() {
    // const [testQuestions, setTestQuestions] = useState<number[]>([]);

    const [searchInput, setSearchInput] = useState<string>('');

    const { testConfig, setTestConfig } = useTestConfig();
    const {testQuestions} = testConfig;
    // console.log(testConfig);

    const userHasSearched = !(searchInput === "");

    const filteredQuestions = userHasSearched
        ? questionSet.filter(question =>
            question.name.toLowerCase().includes(searchInput.toLowerCase())
        )
        : questionSet;

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
        <div>
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
                                {questionSet.find(q => q.id === id)?.name}

                                <button onClick={() => handleDeselect(id)}>
                                    <MdOutlineClose className="text-xl group-hover:text-red-600 group-hover:scale-[1.2]  transition-all duration-150" />
                                </button>
                            </li>
                        )
                    }
                </ul>
            </div>

            {/* Display atleast 4 recent/search questions */}
            <div className=" w-[90%]">

                <h4 className="text-lg mb-4">
                    {userHasSearched ? "Search Results" : "Recent"}
                </h4>

                <div className="w-full flex justify-center">
                    <ul className="grid grid-cols-4 gap-8">
                        {filteredQuestions.slice(0, 4).map(q => {
                            return (
                                <li
                                    key={q.id}
                                    className={`border-2  ${(testQuestions.includes(q.id)) ? "border-green-400 hover:outline-green-400" : "border-slate-400 hover:border-gray-600 hover:outline-gray-600"} 
                                            p-5 flex flex-col justify-between h-[200px] group
                                            w-[250px] rounded-md hover:outline-2 hover:outline cursor-pointer`}
                                    onClick={() => handleClickToggle(q.id)}
                                >
                                    <span className="border border-gray-400 flex items-center justify-center w-14 h-14 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor" className="h-9 w-9 text-gray-500 ">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 2.25h-9A2.25 2.25 0 005.25 4.5v15A2.25 2.25 0 007.5 21.75h9A2.25 2.25 0 0018.75 19.5v-15a2.25 2.25 0 00-2.25-2.25zM16.5 2.25v4.5h-4.5" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 10.5h7.5M8.25 13.5h7.5M8.25 16.5h4.5" />
                                        </svg>
                                    </span>

                                    <div>
                                        <h6 className="text-md font-semibold">{q.name}</h6>
                                        <p>Set id: {q.id}</p>
                                        <p>Questions: {q.questions}</p>
                                    </div>
                                </li>
                            )
                        })}

                    </ul>

                </div>
            </div>

        </div>
    )
}

export default QuestionSetSelector;