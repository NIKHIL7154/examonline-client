import gsap from "gsap";
import { useEffect, useRef } from "react"
import { TestType } from "./TestSpawner";
import { format } from "date-fns";
import { Link } from "react-router-dom";

type Props = {
    item: TestType, 
    delay: number,
}


const TestCard = ({item, delay}: Props) => {
    // console.log("hello");
    
    const testCardRef = useRef(null);
    const { _id: testId, name, createdAt, status, durationInSec } = item
    useEffect(() => {
        if (testCardRef.current) {
            gsap.fromTo(testCardRef.current, { opacity: 0, y: 200 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out", delay: delay });
        }
    }, [delay]);

    return (
        <div ref={testCardRef} className="relative h-[250px] p-6 border-2 border-gray-100 rounded-lg overflow-hidden max-w-sm mt-2">
            <span className="absolute z-[1] inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600" />
            <div className="my-2">
                <h2 className="text-black text-2xl font-bold pb-2">{name}</h2>
                <p className="text-gray-900 py-1">Id: <Clabel>{testId}</Clabel></p>
                {/* <p className="text-gray-900 py-1">Question Set Id: <Clabel>{questionSet[0]}</Clabel></p> */}
                <p className="text-gray-900 py-1">Duration: <Clabel>{`${Math.floor((durationInSec)/60)} minutes`}</Clabel></p>
                <p className="text-gray-900 py-1">Created on: <Clabel>{format(createdAt, 'MMM dd, yyyy')}</Clabel></p>

            </div>
            <div className="flex justify-between">
                <span
                    className={`px-2 py-1 font-semibold rounded border ${status === 'Active' ? 'bg-green-200 border-green-400' :
                            status === 'Completed' ? 'bg-gray-200 border-gray-400' :
                                'bg-red-200 border-red-400'
                        }`}
                >
                    {status}
                </span>
                <Link to={`test/${testId}`} className="px-2 py-1 text-black border border-gray-200 font-semibold rounded hover:bg-green-300">View</Link>
            </div>
        </div>
    )
}

type LabelChildren = {
    children: React.ReactNode
}
const Clabel = (props: LabelChildren) => {
    return (
        <label className="text-black text-lg font-bold pb-2">{props.children}</label>
    )
}

export default TestCard