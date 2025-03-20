// import TestsChecker from './components/testView/TestsChecker';
import TestSpawner from './components/testView/TestSpawner';

export type TestObject = {
  testId: string,
  name: string,
  questionSetId: number,
  createdOn: string,
  status: string,

}

const TestsLayout = () => {
  
  return (
    <div className='w-full h-full overflow-y-auto overflow-x-hidden flexed'>

      <TestSpawner />

    </div>
  )
}

export default TestsLayout