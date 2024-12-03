import React, { Dispatch } from 'react'
import nothing from "../../../../assets/nothing.png"
type Props = {

    testNavigate: Dispatch<React.SetStateAction<"noTests" | "viewTests" | "createTests">>;
}

const TestsChecker = (props: Props) => {
    const { testNavigate } = props
    return (
        <div className='w-full text-lg poppins-medium h-full flex flex-col justify-center items-center'>
            <img src={nothing} className='w-[30%] h-suto' alt="" />
            <p className='my-5'>No tests created yet</p>
            <button onClick={()=>{testNavigate("createTests")}} className='btn'>Create test now</button>
        </div>
    )
}

export default TestsChecker