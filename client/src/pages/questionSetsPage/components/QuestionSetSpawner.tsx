import QuestionSetList from './QuestionSetList';

const QuestionSetSpawner = () => {
  return (
    <div className="w-full flex justify-center items-center flex-col ">
      <p className="m-4 text-center text-2xl">Your Question Sets</p>
      <QuestionSetList />
    </div>
  );
};

export default QuestionSetSpawner;
