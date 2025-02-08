
import nothing from "../../../../assets/nothing.png"
import { useNavigate } from 'react-router-dom'


const TestsChecker = () => {
    const navigate=useNavigate();
    return (
        <div className='w-full text-lg poppins-medium h-full flex flex-col justify-center items-center'>
            <img src={nothing} className='w-[30%] h-suto' alt="" />
            <p className='my-5'>No tests created yet</p>
            <button onClick={()=>{navigate("create")}} className='btn'>Create test now</button>
        </div>
    )
}

export default TestsChecker