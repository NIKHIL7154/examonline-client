import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import QuestionCard from './components/QuestionCard';

interface Question {
  id: number;
  questionText: string;
  options: string[];
  correctAnswer: string;
}

const QuestionSet = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  // Function to handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        const parsedQuestions = parseExcelFile(content);
        setQuestions(parsedQuestions);
      };
      reader.readAsBinaryString(file);
    }
  };

  // Function to parse Excel file
  const parseExcelFile = (content: string): Question[] => {
    const wb = XLSX.read(content, { type: 'binary' });
    const ws = wb.Sheets[wb.SheetNames[0]]; // Assuming the first sheet contains questions
    const data = XLSX.utils.sheet_to_json(ws, { header: 1 }); // Convert sheet to JSON with rows as arrays

    const parsedQuestions: Question[] = data.slice(1).map((row: any, index: number) => {
      return {
        id: index + 1,
        questionText: row[1], // Assuming column 2 contains the question text
        options: [row[2], row[3], row[4], row[5]], // Columns 3-6 contain options
        correctAnswer: row[6], // Column 7 contains the correct answer (A, B, C, or D)
      };
    });

    return parsedQuestions;
  };

  // Handle answering the question
  const handleAnswer = (answer: string) => {
    setAnswers((prev) => ({ ...prev, [questions[currentQuestionIndex].id]: answer }));
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log('Quiz finished. Answers:', answers);
    }
  };

  return (
    <div className='bd'>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      {questions.length > 0 && (
        <div>
          <h3>{questions[currentQuestionIndex].questionText}</h3>
          <div>
            {questions[currentQuestionIndex].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(option)}>
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
      <QuestionCard/>
    </div>
  );
};

export default QuestionSet;
