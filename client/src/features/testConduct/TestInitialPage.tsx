import axios from 'axios';
import { useEffect, useState } from 'react'
import LoaderNew from '../../ui/LoaderNew';
import { useTestNavigation } from './TestNavigationContext';


type Props = {
  updateToken: (token: string) => void;
}

const TestInitialPage = (props: Props) => {
 

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");


  const [testVerificationStatus, setTestVerificationStatus] = useState<boolean>(true);
  const [requestStatus, setRequestStatus] = useState<boolean>(false);
  const [serverResponse, setserverResponse] = useState<string>('');
  const [testInfo, settestInfo] = useState({
    duration:0,
    questionCount:0,
    userName:""
  });
  const { setCurrentStep } = useTestNavigation();
  useEffect(() => {
    const verifyTest = async () => {
      try {
        const response = await axios.post('http://localhost:2121/test', { token });
        console.log(response)
        if (response.status == 200) {
          props.updateToken(response.data.data.testToken);
          
          settestInfo({
            duration: response.data.data.duration,
            questionCount: response.data.data.questionCount,
            userName: response.data.data.userName
          })
          
          setTestVerificationStatus(true);
        } else {
          setTestVerificationStatus(false)
        }

      } catch (error: any) {
        
        console.log(error);
        setTestVerificationStatus(false)
        if(error.response.status===401){
          setserverResponse("No Test Found")
        }else{
          setserverResponse(error.response.data.message);
        }
        

      } finally {
        setRequestStatus(true);
      }
    }
    verifyTest();
    return () => {

    };
  }, []);

  if (!requestStatus) {
    return <div className='w-full h-full flex flex-col items-center justify-center'>
      <LoaderNew />
      <h4 className='mt-4'>Please wait while we fetch your test</h4>
    </div>
  }

  if (!testVerificationStatus) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">404</h2>
        <p className="text-lg">{serverResponse}</p>
        <button onClick={() => window.location.href = '/'} className="mt-6 cursor-pointer bg-[#4CD964] p-3 rounded text-white px-6 hover:bg-[#4CD964]/90">
          Go to Home
        </button>
      </div>)
  }


  return (
    <div className="flex w-full h-full flex-col lg:flex-row">
      {/* Left Section */}
      <div className="flex flex-col justify-between bg-primary p-8 lg:w-2/6">
        <div className="space-y-4 items-center flex-grow flex flex-col justify-center">
          <h2 className="text-xl text-white w-[75%] text-left">Hello, {testInfo.userName}</h2>
          <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Welcome to
            <br />
            Examfusion
          </h1>
        </div>
        <div className="mt-8 flex h-16 text-center justify-center  flex-col gap-4 text-white sm:flex-row sm:gap-12">
          <div className=''>
            <p className="text-lg">Test duration</p>
            <p className="text-2xl font-semibold">{testInfo.duration} min</p>
          </div>
          <div>
            <p className="text-lg">Total questions</p>
            <p className="text-2xl font-semibold">{testInfo.questionCount}</p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-1 flex-col p-8 lg:w-1/2">
        <div className="flex justify-end">
          <a href="#" className="text-sm font-medium hover:underline">
            Help ?
          </a>
        </div>

        <div className="mx-auto max-w-2xl flex-1 pt-12 flex flex-col justify-center">
          <h2 className="mb-8 text-3xl font-bold">Instructions</h2>
          <ol className="space-y-4 text-xl">
            <li className="flex gap-2">
              <span>1.</span>
              <span>Please read each question thoroughly before answering.</span>
            </li>
            <li className="flex gap-2">
              <span>2.</span>
              <span>Please avoid using external resources, notes, or assistance during the test.</span>
            </li>
            <li className="flex gap-2">
              <span>3.</span>
              <span>
                Ensure all answers are submitted before the timer runs out. Unsubmitted answers will not be recorded.
              </span>
            </li>
            <li className="flex gap-2">
              <span>4.</span>
              <span>Make sure your internet connection is stable.</span>
            </li>
            <li className="flex gap-2">
              <span>5.</span>
              <span>If you encounter technical issues, contact us immediately.</span>
            </li>
          </ol>

          <div className="mt-12 flex justify-center">
            <button onClick={() => setCurrentStep('environment')} className="bg-primary p-4 rounded text-white px-8 hover:bg-[#4CD964]/90">
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestInitialPage