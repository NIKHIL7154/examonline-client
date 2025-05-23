import addNew from "./add-item.svg";
import importItem from "./import-item.svg";
import fingerSnap from "./finger-snap.svg";
import { Link } from 'react-router-dom';
function CreateTestOptions() {
    return (
        <>
            <li>
                <Link to="/app/questions/create" className='h-[240px] w-[300px] border-2 border-gray-300 rounded-md  bg-[#D9D9D9] flex flex-col justify-center items-center gap-1 p-5 hover:bg-slate-50 transition-all duration-300 cursor-pointer'>
                    <img src={addNew} alt="create from scratch" className='h-[70px] w-[80px] mb-3' />
                    <h5 className='font-semibold text-[1.23rem]'>Start from scratch</h5>
                    <span className='text-center text-gray-600'>Create your own question set for the exam.</span>
                </Link>
            </li>
            <li>
                <Link to="new-test/testQuestions" className='h-[240px] w-[300px] border-2 border-gray-300 rounded-md  bg-[#D9D9D9] flex flex-col justify-center items-center gap-1 p-5 hover:bg-slate-50 transition-all duration-300 cursor-pointer'>
                    <img src={importItem} alt="import questions" className='h-[70px] w-[80px] mb-3' />
                    <h5 className='font-semibold text-[1.23rem]'>Use existing questions set</h5>
                    <span className='text-center text-gray-600'>Choose from previously created question sets.</span>
                </Link>
            </li>
            <li >
                <Link to="/app/questions" className='h-[240px] w-[300px] border-2 border-gray-300 rounded-md  bg-[#D9D9D9] flex flex-col justify-center items-center gap-1 p-5 hover:bg-slate-50 transition-all duration-300 cursor-pointer'>

                    <img src={fingerSnap} alt="generate using ai" className='h-[70px] w-[80px] mb-3' />
                    <h5 className='font-semibold text-[1.23rem]'>Create with AI</h5>
                    <span className='text-center text-gray-600'>Use AI to help generate questions for your exam</span>
                </Link>
            </li>
        </>
    );
}

export default CreateTestOptions;
