import QuestionCard from './QuestionCard';
import { QuestionSet } from '../QuestionsPage';
import { motion } from 'framer-motion';

type Props = {
  data: QuestionSet[];
};

const QuestionSetSpawner = (props: Props) => {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      <p className="m-4 text-center text-2xl">Question Sets</p>
      <motion.div
        initial="hidden" 
        animate="visible" 
        variants={{
          hidden: { opacity: 0, y: 0 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.3 ,when:"beforeChildren"} }
        }}
        className="w-full flex-grow grid grid-cols-3 overflow-y-auto gap-4 p-4"
      >
        {props.data.map((item, index) => 
          
            <QuestionCard key={index} item={item} />
          
        )}
      </motion.div>
    </div>
  );
};

export default QuestionSetSpawner;
