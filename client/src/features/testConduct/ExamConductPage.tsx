import { useEffect, useState } from "react";
import { useQuestionStore } from "./components/QuestionStore";
import { useTestNavigation } from "./TestNavigationContext";
import { socket } from "../../services/socket";
import { SocketEvents } from "../../types/ExamConductTypes";



type Question = {
  questionTitle: string;
  options: { A: string; B: string; C: string; D: string };
  userChoice: string;
  visited: boolean;
};


type OptionType = "A" | "B" | "C" | "D";
const ExamConductPage = () => {
  const {getQuestions,setQuestions}=useQuestionStore();
  const questions:Question[] =getQuestions();
  const {  setCurrentStep } = useTestNavigation();
  const [timeLeft, setTimeLeft] = useState(300); // 20 minutes in seconds
  const [progress] = useState(50);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>(questions[currentQuestionIndex].userChoice);
  const arr: Array<OptionType> = ["A", "B", "C", "D"];
  
  useEffect(() => {
    socket.off(SocketEvents.SYNC_TIME);
    
    socket.on(SocketEvents.SYNC_TIME, (data) => {
      setTimeLeft(data.timeLeft
      )
      console.log(data.timeLeft)
    });
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleQuestionChange = (index: number) => {
  
    questions[currentQuestionIndex].visited = true;
    setQuestions(questions);
    setCurrentQuestionIndex(index);
    setSelectedAnswer(questions[index].userChoice); // Reset selected answer for the new question
  };

  const handleAnswerSelection = (option: string) => {
    questions[currentQuestionIndex].userChoice = option;
    socket.emit(SocketEvents.ANSWER_SUBMITTED, { questionIndex: currentQuestionIndex, question:questions[currentQuestionIndex] });
    setQuestions(questions);
    setSelectedAnswer(option);
  }
  const handleClearAnswerSelection = () => {
    questions[currentQuestionIndex].userChoice = "";
    setQuestions(questions);
    setSelectedAnswer("");
  }
  const handleTestSubmission = () => {
    setCurrentStep("completed")
    socket.emit(SocketEvents.TEST_COMPLETED,{})
    return

  }


  const currentQuestion = questions[currentQuestionIndex];
  

  return (
    <div  className="h-full w-full flex flex-col bg-white p-4 md:p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-4">
        <div className="text-2xl font-bold">ExamFusion</div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button tabIndex={-1} onClick={handleTestSubmission} className="bg-red-600 text-white px-3 py-1 text-xs rounded">
              FINISH TEST
            </button>
            <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-gray-500 text-sm">{progress}%</span>
          </div>
          <div className="text-xl font-mono">{formatTime(timeLeft)}</div>
        </div>
      </header>

      {/* Section Title */}
      <div className="text-right mb-4 text-sm text-gray-500">
        Section 01 - Aptitude - Qualifier Test (02/02/2025)
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col">
        <div className="flex-grow flex justify-between items-start">
          <div className="w-full">
            <h2 className="text-xl font-semibold mb-4">Q: {questions.indexOf(currentQuestion)+1}</h2>
            <p className="text-lg mb-6">{currentQuestion.questionTitle}</p>
            {/* Options */}
            {}
            {arr.map((option: OptionType, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  tabIndex={-1}
                  type="radio"
                  id={`option-${index}`}
                  name="answer"
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={(e) => handleAnswerSelection(e.target.value)}
                  className="form-radio h-4 w-4 text-blue-600 cursor-pointer"
                />
                <label htmlFor={`option-${index}`} className="text-lg cursor-pointer">
                  {currentQuestion.options[option]}
                </label>
              </div>
            ))}

            {/* {currentQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="radio"
                  id={`option-${index}`}
                  name="answer"
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <label htmlFor={`option-${index}`} className="text-lg">
                  {option}
                </label>
              </div>
            ))} */}

            <button
              tabIndex={-1}
              className="mt-4 text-blue-600 flex items-center gap-2"
              onClick={handleClearAnswerSelection}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              CLEAR ANSWER
            </button>
          </div>

          {/* Question Numbers Grid */}
          <div className="w-1/3">
            <div className="grid grid-cols-7 gap-2 max-w-md mb-2">
              {questions.map((question, index) => (
                <div
                  key={index}
                  className={`aspect-square flex items-center justify-center rounded-md text-lg cursor-pointer 
                  ${index === currentQuestionIndex
                      ? "bg-blue-600 text-white"
                      : (question.userChoice != "" ? "bg-green-600 text-white"
                        : (question.visited ? "bg-red-500 text-white" : "bg-purple-100 text-purple-900")
                      )
                    }`}
                  onClick={() => handleQuestionChange(index)}
                >
                  {index+1}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
              Skipped Question
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="w-3 h-3 bg-green-600 rounded-sm"></div>
              Answered Question
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="w-3 h-3 bg-purple-100 rounded-sm"></div>
              Not Visited
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-4 text-sm">
          <span className="text-gray-500">Correct answer: +10</span>
          <span className="text-gray-500">Wrong answer: -0</span>
        </div>
        <div className="flex gap-4">
          <button
            tabIndex={-1}
            className={`${currentQuestionIndex > 0 ? "bg-blue-600" : "bg-gray-400"} text-white px-4 py-2 rounded`}
            onClick={() =>
              currentQuestionIndex > 0 &&
              handleQuestionChange(currentQuestionIndex - 1)
            }
          >
            PREVIOUS
          </button>
          <button
          tabIndex={-1}
            className={`${currentQuestionIndex < questions.length - 1 ? "bg-blue-600" : "bg-red-600"} text-white px-4 py-2 rounded`}
            onClick={() =>
              currentQuestionIndex < questions.length - 1 &&
              handleQuestionChange(currentQuestionIndex + 1)
            }
          >
            {currentQuestionIndex < questions.length - 1 ? "NEXT" : "SUBMIT"}
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ExamConductPage;
