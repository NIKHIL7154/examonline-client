function QuestionCard() {
    const options: string[] = [
        "A pointer whose value is undefined",
        "A pointer who has never been deleted from the memory",
        "A pointer pointing to memory address which is no longer accessible ",
        "None of these"
    ];

    const renderedOptions = options.map((item, index) => {
        const letter: number = 65;
        return (
            <li key={index+1} className="break-words flex flex-row gap-[1.5rem] text-xl bg-white p-[10px] hover:bg-slate-300 cursor-pointer">
                <span>{String.fromCharCode(letter + index)}.</span>
                <p>{item}</p>
            </li>
        )
    }
    );

    return (
        <div className="border border-2 w-[70%] p-[30px] bg-gray-200 flex flex-col gap-[1.5rem]">
            <h2 className=" text-xl text-slate-700">Question no. 5</h2>
            <h2 className=" text-xl">In C/C++ a dangling pointer is</h2>
            <ul className="flex flex-col gap-[1.5rem]">{renderedOptions}</ul>
        </div>
    );
}

export default QuestionCard;