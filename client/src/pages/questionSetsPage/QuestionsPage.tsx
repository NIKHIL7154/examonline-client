import QuestionTemplate from './templatepage/QuestionTemplate';
import QuestionSetSpawner from './components/QuestionSetSpawner';


export type QuestionSet = {
  name: string,
  _id: string,
  user: string,
  totalQuestions: number,
  createdAt: Date,
}

const QuestionsPage = () => {

  return (
    <div className='w-full h-full overflow-y-auto'>
      <QuestionTemplate />
      <QuestionSetSpawner />
    </div>
  );
};

export default QuestionsPage;
