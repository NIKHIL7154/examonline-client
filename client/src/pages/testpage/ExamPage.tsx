
import QuetionCard from '../../components/QuestionCard'
import QuetionList from '../../components/QuestionList'



const ExamPage = () => {
  return (
    <div className='mx-auto my-auto flex flex-row w-[80%] h-[500px] gap-[20px]'>
      {/* hello */}
      <time className="absolute text-xl right-[30px] top-[10px]"> Timer : 59:59</time>
      <QuetionCard />
      <QuetionList />
      <div className="absolute text-xl right-[100px] bottom-[30px] flex flex-row gap-[2rem]"> 
        <button className=' py-1 px-7 bg-gray-300 hover:bg-gray-400' >Skip</button>
        <button className='bg-gray-300 py-1 px-7 hover:bg-gray-400' >Next</button>
      </div>
      
    </div>
  )
}

export default ExamPage