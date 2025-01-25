import { useEffect, useState } from 'react';

import QuestionTemplate from '../templatepage/QuestionTemplate';
import QuestionSetSpawner from './components/QuestionSetSpawner';


export type QuestionSet = {
  name: string,
  id: string,
  questions: number
}

const QuestionsPage = () => {
  //const navigate = useNavigate()
  const [questionSets, setquestionSets] = useState<QuestionSet[]>([]);
  useEffect(() => {
    //api call to fetch question sets
    setquestionSets([
      {
        name: "Set 1",
        id: "1",
        questions: 10
      },
      {
        name: "Set 2",
        id: "2",
        questions: 10
      },
      {
        name: "Set 3",
        id: "3",
        questions: 10
      },
      {
        name: "Set 4",
        id: "4",
        questions: 10
      },
      {
        name: "Set 5",
        id: "5",
        questions: 10
      },
      {
        name: "Set 5",
        id: "5",
        questions: 10
      },
      {
        name: "Set 5",
        id: "5",
        questions: 10
      },
      {
        name: "Set 5",
        id: "5",
        questions: 10
      },
      {
        name: "Set 5",
        id: "5",
        questions: 10
      },
    ])
    return () => {

    };
  }, []);


  const [questionState, setquestionState] = useState<boolean>(false);

  return (
    <div className='w-full h-full'>


      {questionState ? <QuestionTemplate /> : <QuestionSetSpawner data={questionSets} />}
      {!questionState && <button
        className="absolute w-16 right-5 bottom-5 bg-blue-500 text-white p-4 rounded-full flex items-center justify-center shadow-lg duration-500 hover:w-52 hover:rounded-full overflow-hidden group"
        onClick={() => {
          setquestionState(true);
        }}
      >
        <span className="text-2xl font-bold transition-all duration-300 transform group-hover:translate-x-2">
          +
        </span>
        <span className="ml-4 opacity-0 h-full hidden group-hover:block 
   group-hover:opacity-100 duration-700 text-ellipsis overflow-hidden whitespace-nowrap">
          Create Question Set
        </span>
      </button>}



    </div>
  );
};

export default QuestionsPage;
