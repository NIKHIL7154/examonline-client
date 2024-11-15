function QuetionList() {
    const questionCount: number[] = [1, 2, 3, 4, 5, 6];

    const renderedCount = questionCount.map( (item ) => {
        return <li className="text-xl py-1 px-3 border border-black hover:bg-slate-400 cursor-pointer"> {item} </li>
    });
    
    return (
        <div className="border border-2 w-[30%] p-[30px] bg-gray-200 flex flex-col gap-[2rem]">
            <h2 className=" text-xl text-slate-700">Questions: </h2>
            <ul className="flex flex-row flex-wrap gap-5">
                {renderedCount}
            </ul>

            <div className=" mt-auto ml-auto flex flex-col"> 
                <span className=" flex flex-row gap-3 justify-between items-center">
                    <h5>Answered</h5>
                    <small className="bg-green-500 h-[15px] w-[15px] rounded-[50%]"></small>
                </span>
                <span className=" flex flex-row gap-3 justify-between items-center">
                    <h5>Visited</h5>
                    <small className="bg-purple-500 h-[15px] w-[15px] rounded-[50%]"></small>
                </span>
                <span className=" flex flex-row gap-3 justify-between items-center">
                    <h5>Marked</h5>
                    <small className="bg-yellow-300 h-[15px] w-[15px] rounded-[50%]"></small>
                </span>
            </div>

        </div>
    );
}

export default QuetionList;