// import { TestObject } from '../../TestsLayout'
// import TestCard from './TestCard'
import { useNavigate } from 'react-router-dom'
import useTests from '../../hooks/useTests';
import { useAuth } from '@clerk/clerk-react';
import Spinner from '../../../../components/Spinner';
import TestsChecker from './TestsChecker';
import TestCard from './TestCard';

// type Props = {
//     testObjects:Array<TestObject>
// }
export interface TestType extends Document {
    _id: string;
    name: string;
    questionSet: string[];
    status: string;
    createdAt: Date;
    startAt: Date;
    durationInSec: number;
    endAt: Date;
    proctoring: boolean;
    tabSwitchLimit: number;
    resumable: boolean;
    user: string;
    participants: string[];
    linksForwarded: string;
    // participants: mongoose.Types.ObjectId;
}

const TestsTableView = () => {

    const navigate = useNavigate();
    // const {testObjects} = props;
    const { getToken } = useAuth();

    const { isLoading, tests } = useTests(getToken)

    if (isLoading) return <Spinner />;
    const { tests: testsArr, totalTests } = tests.data;
    // console.log(testsArr);

    if (totalTests === 0) return <TestsChecker />


    return (
        <div className="w-full h-full flex items-center flex-col">

            <button
                onMouseEnter={(e) => { e.currentTarget.innerText = "Create Test"; e.currentTarget.style.transform = "scale(1.1)"; }}
                onMouseLeave={(e) => { e.currentTarget.innerText = "+"; e.currentTarget.style.transform = "scale(1)"; }}
                onClick={() => { navigate("create") }}
                className='btn absolute right-5 bottom-5 z-[2]'>
                +
            </button>
            <p className='text-center text-xl poppins-regular my-4'>Your tests</p>
            <div className='w-[90%] flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>

                {
                    testsArr.map((testItem: TestType, index: number) =>
                        <TestCard key={testItem._id} item={testItem} delay={index / 10} />

                    )
                }
            </div>




        </div>
    )
}

export default TestsTableView