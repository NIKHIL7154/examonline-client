import { useTestDetails } from './TestDetailsContext';

const TestReview = () => {
  const { testDetails } = useTestDetails();

  return (
    <div className="max-w-4xl mx-auto bg-white flex flex-col justify-center  rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-8 text-center">Review Test Settings</h2>
     
      <ul className="space-y-2 text-lg">
        <li className="flex justify-between">
          <span className="font-medium">Start At:</span>
          <span>{testDetails.testSettings.startAt?.toString() || 'N/A'}</span>
        </li>
        <li className="flex justify-between">
          <span className="font-medium">End At:</span>
          <span>{testDetails.testSettings.endAt?.toString() || 'N/A'}</span>
        </li>
        <li className="flex justify-between">
          <span className="font-medium">Duration:</span>
          <span>{testDetails.testSettings.duration} minutes</span>
        </li>
        <li className="flex justify-between">
          <span className="font-medium">Tab Switch Limit:</span>
          <span>Maximum Tab switches allowed : {testDetails.testSettings.tabSwitchLimit}</span>
        </li>
        <li className="flex justify-between">
          <span className="font-medium">Proctoring Level:</span>
          <span>{testDetails.testSettings.proctoringLevel=="Basic"?"Basic : Copy-Paste and Tab Switching Protection":"Advanced : Face verification, AI proctoring, Mobile Detection + Basic"}</span>
        </li>
        <li className="flex justify-between">
          <span className="font-medium">Resumeable:</span>
          <span>{testDetails.testSettings.resumeable}</span>
        </li>
        
      </ul>
      <div className='flexed !flex-col relative my-8'>
        <hr className='w-full text-gray-300'/>
        <p className='absolute z-10 bg-white px-2 text-lg'>Key Points Regarding your Test</p>
      </div>
      <ol className="space-y-2 text-lg text-gray-400 list-decimal">
        <li className='list-item'>Participants can only attempt test between {testDetails.testSettings.startAt?.toString()} and {testDetails.testSettings.endAt?.toString()}. After this time test will not be accessible.</li>
        <li className='list-item'>An email with unique test link will be triggered to each participant and they can only access the test using that link.</li>
        <li className='list-item underline'>Emails will not be triggered automatically. After creating the test you have to activate the test in dashboard only then emails will be triggered to participants.</li>
        <li className='list-item'>Make sure you activate the test minimum 2 hours before the start time of test to ensure that everyone gets the test link timely.</li>

      </ol>
    </div>
  );
};

export default TestReview;
