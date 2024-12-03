import { TestObject } from '../../TestsLayout'

import { Dispatch } from 'react'
import TestCard from './TestCard'

type Props = {

    testNavigate: Dispatch<React.SetStateAction<"noTests" | "viewTests" | "createTests">>,
    testObjects:Array<TestObject>
}

const TestsTableView = (props: Props) => {
    const {testObjects} = props
    return (
        <div className="w-full h-full flex items-center flex-col">
            
            <button
                onMouseEnter={(e) => { e.currentTarget.innerText = "Create Test"; e.currentTarget.style.transform = "scale(1.1)"; }} 
                onMouseLeave={(e) => { e.currentTarget.innerText = "+"; e.currentTarget.style.transform = "scale(1)"; }} 
                onClick={() => { props.testNavigate("createTests") }} 
                className='btn absolute right-5 bottom-5 z-[2]'>
                +
            </button>
            <p className='text-center text-xl poppins-regular my-4'>Your tests</p>
            <div className='w-[90%] flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            
            {/* {testObjects.map((item, index) => <TestCard key={index} item={item} />)} */}
            {}
            {Array.from({ length: 7 }).map((_, index) => (
                <TestCard key={index} item={testObjects[0]} delay={index*100} />
            ))}
            </div>
            

            
            
        </div>
    )
}

export default TestsTableView