
import createTestIcon from '../../../assets/createtest.png'
type Props = {}

const CreateTestDialog = () => {
  return (
    <div className='w-full text-lg poppins-medium h-full flex flex-col justify-center items-center'>
            <img src={createTestIcon} className='w-[25%] h-suto' alt="" />
            <p className='my-5'>No Question Set found. You have to create a question set in order to create a test.</p>
            <button onClick={()=>{}} className='btn'>Create Question Set</button>
    </div>
  )
}

export default CreateTestDialog