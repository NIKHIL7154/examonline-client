import { useEffect, useState } from 'react';

import QuestionTemplate from './templatepage/QuestionTemplate';
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



  return (
    <div className='w-full h-full overflow-y-auto'>


      <QuestionTemplate /> 
      <QuestionSetSpawner data={questionSets} />


      


    </div>
  );
};

export default QuestionsPage;
