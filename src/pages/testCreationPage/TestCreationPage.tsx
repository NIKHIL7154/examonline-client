import { useEffect } from 'react'
import CreateTestOptions from './CreateTestOptions';

type Props = {}

const TestCreationPage = (props: Props) => {
  useEffect(() => {
    //api call to fetch question sets
    return () => {

    };
  }, [])
  return (

    <div className='w-full h-full'>
      <div className='size-full gap-12 flex flex-col mt-[100px] items-center'>

        <h2 className='text-[1.5rem]'>
          How do you want to build your test?
        </h2>

        <ul className='flex gap-5'>
          <CreateTestOptions />
        </ul>

      </div>
    </div>
  )
}

export default TestCreationPage;